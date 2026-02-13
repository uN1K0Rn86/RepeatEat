import request from 'supertest'
import { describe, it, expect, beforeAll } from 'vitest'
import { RecipeIngredientWithName, RecipeStep } from '@repeateat/shared'

import app from '../app'

describe('Recipe-related endpoints', () => {
  describe('GET /', () => {
    it('returns correct amount of recipes', async () => {
      const response = await request(app).get('/api/recipe')
      expect(response.body.length).toEqual(10)
    })

    it('recipes have ingredients, categories, and steps', async () => {
      const response = await request(app).get('/api/recipe')
      const randomNumber = Math.floor(Math.random() * 10)
      const randomRecipe = response.body[randomNumber]

      expect(randomRecipe).toHaveProperty('ingredients')
      expect(randomRecipe).toHaveProperty('steps')
      expect(randomRecipe).toHaveProperty('categories')
    })
  })

  describe('POST /', () => {
    it('returns valid object with correct properties', async () => {
      const testEmail = 'test@example.com'
      const testPassword = 'password123'
      await request(app).post('/api/auth/sign-up/email').send({
        email: testEmail,
        password: testPassword,
        name: 'Test User',
      })
      const loginResponse = await request(app)
        .post('/api/auth/sign-in/email')
        .send({ email: testEmail, password: testPassword })
      const authCookie = loginResponse.get('Set-Cookie')

      if (!authCookie) return

      const recipeToPost = {
        name: 'Korma',
        ingredients: [
          { name: 'Cucumber', quantity: '0.5', unit: 'pcs' },
          { name: 'Rice', quantity: '4', unit: 'dl' },
        ],
        steps: [{ content: 'Cook rice' }, { content: 'Chop tofu' }],
        categories: [1, 3],
        private: false,
      }

      const response = await request(app)
        .post('/api/recipe')
        .set('Cookie', authCookie)
        .send(recipeToPost)
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('name')
      expect(response.body).toHaveProperty('authorId')
      expect(response.body.ingredients).toHaveLength(2)
      expect(response.body.steps).toHaveLength(2)
      expect(response.body.categories).toHaveLength(2)
    })
  })

  describe('GET /ingredient', () => {
    it('returns correct amount of ingredients', async () => {
      const response = await request(app).get('/api/recipe/ingredient')
      expect(response.body.length).toEqual(12)
    })
  })

  describe('POST /ingredient', () => {
    it('returns a valid object with id and name', async () => {
      const ingredientToPost = {
        name: 'Cauliflower',
      }

      const response = await request(app)
        .post('/api/recipe/ingredient')
        .send(ingredientToPost)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('name')
    })
  })

  describe('GET /category', () => {
    it('returns a valid array of categories with ids and names', async () => {
      const response = await request(app).get('/api/recipe/category')
      expect(response.body.length).toBe(6)
    })
  })

  describe('PUT /:id', () => {
    let recipeToUpdate: any
    let otherRecipes: any
    let authCookie: string[] | undefined

    beforeAll(async () => {
      const loginResponse = await request(app)
        .post('/api/auth/sign-in/email')
        .send({ email: 'test@example.com', password: 'password123' })

      authCookie = loginResponse.get('Set-Cookie')

      const response = await request(app).get('/api/recipe')
      recipeToUpdate = response.body[0]
      otherRecipes = response.body.slice(1)
    })

    it('changes recipe name when edited', async () => {
      const payload = { ...recipeToUpdate, name: 'Not Korma' }

      const response = await request(app)
        .put(`/api/recipe/${recipeToUpdate.id}`)
        .set('Cookie', authCookie!)
        .send(payload)
      const updatedRecipe = response.body

      expect(updatedRecipe.name).toBe('Not Korma')
    })

    it('does not change other recipes', async () => {
      const payload = { ...recipeToUpdate, name: 'Not Korma' }

      await request(app)
        .put(`/api/recipe/${recipeToUpdate.id}`)
        .set('Cookie', authCookie!)
        .send(payload)

      const newResponse = await request(app).get('/api/recipe')
      const newOtherRecipes = newResponse.body.slice(1)
      expect(otherRecipes).toEqual(newOtherRecipes)
    })

    it('changes ingredient when edited', async () => {
      const indexToChange = 0
      const payload = {
        ...recipeToUpdate,
        ingredients: recipeToUpdate.ingredients.map(
          (ing: RecipeIngredientWithName, i: number) =>
            i === indexToChange
              ? {
                  ...ing,
                  ingredient: {
                    ...ing.ingredient,
                    name: 'Tomato',
                  },
                  quantity: 2,
                  unit: 'pcs',
                }
              : ing,
        ),
      }

      const response = await request(app)
        .put(`/api/recipe/${recipeToUpdate.id}`)
        .set('Cookie', authCookie!)
        .send(payload)
      const updatedIngredients = response.body.ingredients

      expect(updatedIngredients[0].ingredient.name).toEqual('Tomato')
      expect(updatedIngredients[0].quantity).toEqual(2)
      expect(updatedIngredients[0].unit).toEqual('pcs')
    })

    it('changes step content when edited', async () => {
      const indexToChange = 1
      console.log(recipeToUpdate)

      const payload = {
        ...recipeToUpdate,
        steps: recipeToUpdate.steps.map((step: RecipeStep, i: number) =>
          i === indexToChange
            ? {
                ...step,
                content: 'Dont chop tofu',
              }
            : step,
        ),
      }

      const response = await request(app)
        .put(`/api/recipe/${recipeToUpdate.id}`)
        .set('Cookie', authCookie!)
        .send(payload)
      const updatedsteps = response.body.steps

      expect(updatedsteps[1].content).toEqual('Dont chop tofu')
    })
  })
})
