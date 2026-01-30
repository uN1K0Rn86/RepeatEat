import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { Ingredient } from '@repeateat/shared'

import app from '../app'

describe('Recipe-related endpoints', () => {
  describe('get /', () => {
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

  describe('post /', () => {
    it('returns valid object with id, name, and authorId', async () => {
      const recipeToPost = {
        name: 'Korma',
        authorId: 'user_default',
      }

      const response = await request(app).post('/api/recipe').send(recipeToPost)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('name')
      expect(response.body[0]).toHaveProperty('authorId')
    })
  })

  describe('get /ingredient', () => {
    it('returns correct amount of ingredients', async () => {
      const response = await request(app).get('/api/recipe/ingredient')
      expect(response.body.length).toEqual(10)
    })
  })

  describe('post /ingredient', () => {
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

  describe('post /:id/ingredients', () => {
    it('returns valid array with recipeId, ingredientId, quantity, and unit', async () => {
      const quantities = ['500', '1', '2.5']
      const units = ['g', 'kg', 'lb']
      const recipes = await request(app).get('/api/recipe')
      const recipeId = recipes.body[0].id
      const res = await request(app).get('/api/recipe/ingredient')
      const ingredients: Ingredient[] = res.body
      const ingredientIds = ingredients.map((i) => i.id).slice(0, 3)

      const response = await request(app)
        .post(`/api/recipe/${recipeId}/ingredients`)
        .send({
          ingredientIds,
          quantities,
          units,
        })

      console.log(response.body)
      expect(response.body.length).toBe(3)
      expect(response.body[0]).toHaveProperty('recipeId')
      expect(response.body[0]).toHaveProperty('ingredientId')
      expect(response.body[0]).toHaveProperty('quantity')
      expect(response.body[0]).toHaveProperty('unit')
    })
  })
})
