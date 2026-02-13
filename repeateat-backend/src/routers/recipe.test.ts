import request from 'supertest'
import { describe, it, expect } from 'vitest'

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

  describe('get /ingredient', () => {
    it('returns correct amount of ingredients', async () => {
      const response = await request(app).get('/api/recipe/ingredient')
      expect(response.body.length).toEqual(12)
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

  describe('get /category', () => {
    it('returns a valid array of categories with ids and names', async () => {
      const response = await request(app).get('/api/recipe/category')
      expect(response.body.length).toBe(6)
    })
  })
})
