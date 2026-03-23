import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'
import { loginUser } from '../__tests__/utils'
import {
  getHouseholdRecipes,
  getUserHouseholds,
} from '../services/household.service'

describe('Meal plan -related endpoints', () => {
  describe('POST /', () => {
    it.only('succeeds when user is authenticated and household has enough recipes with random preference', async () => {
      const { user, authCookie } = await loginUser(
        'def@google.com',
        'password123',
      )

      const userHouseholds = await getUserHouseholds(user.id)
      const householdId = userHouseholds[0].householdId

      const householdRecipes = await getHouseholdRecipes(householdId)
      const formattedHouseholdRecipes = householdRecipes.map((r) => r.recipe)
      const recipeAmount = 3
      const name = 'March madness'
      const startDate = new Date(2026, 2, 10)
      const endDate = new Date(2026, 2, 17)
      const preference = 'random'

      const mealPlanResponse = await request(app)
        .post(`/api/household/${householdId}/meal-plans`)
        .set('Cookie', authCookie!)
        .send({
          householdRecipes: formattedHouseholdRecipes,
          recipeAmount,
          name,
          startDate,
          endDate,
          preference,
        })

      expect(mealPlanResponse.body.name).toEqual('March madness')
      expect(mealPlanResponse.body.recipes).toHaveLength(3)
    })
  })
})
