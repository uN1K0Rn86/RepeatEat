import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'
import { generateMealPlanInputs, loginUser } from '../__tests__/utils'
import { getUserHouseholds } from '../services/household.service'

describe('Meal plan -related endpoints', () => {
  describe('POST /', () => {
    it('succeeds when user is authenticated and household has enough recipes with random preference', async () => {
      const { user, authCookie } = await loginUser(
        'def@google.com',
        'password123',
      )

      const userHouseholds = await getUserHouseholds(user.id)
      const householdId = userHouseholds[0].householdId

      const recipeAmount = 4
      const mealPlanInput = await generateMealPlanInputs(
        user,
        recipeAmount,
        'March madness',
        new Date(2026, 2, 10),
        new Date(2026, 2, 17),
        'random',
      )

      const mealPlanResponse = await request(app)
        .post(`/api/household/${householdId}/meal-plans`)
        .set('Cookie', authCookie!)
        .send(mealPlanInput)

      expect(mealPlanResponse.body.name).toEqual('March madness')
      expect(mealPlanResponse.body.recipes).toHaveLength(recipeAmount)
    })
  })

  it('succeeds with valid inputs for balanced preference', async () => {
    const { user, authCookie } = await loginUser(
      'def@google.com',
      'password123',
    )

    const userHouseholds = await getUserHouseholds(user.id)
    const householdId = userHouseholds[0].householdId

    const recipeAmount = 3
    const mealPlanInput = await generateMealPlanInputs(
      user,
      recipeAmount,
      'May monologue',
      new Date(2026, 2, 10),
      new Date(2026, 2, 17),
      'balanced',
    )

    const mealPlanResponse = await request(app)
      .post(`/api/household/${householdId}/meal-plans`)
      .set('Cookie', authCookie!)
      .send(mealPlanInput)

    expect(mealPlanResponse.body.recipes).toHaveLength(recipeAmount)
  })

  it('succeeds with valid inputs for favorites preference', async () => {
    const { user, authCookie } = await loginUser(
      'def@google.com',
      'password123',
    )

    const userHouseholds = await getUserHouseholds(user.id)
    const householdId = userHouseholds[0].householdId

    const recipeAmount = 4
    const mealPlanInput = await generateMealPlanInputs(
      user,
      recipeAmount,
      'April fools',
      new Date(2026, 2, 10),
      new Date(2026, 2, 17),
      'favorites',
    )

    const mealPlanResponse = await request(app)
      .post(`/api/household/${householdId}/meal-plans`)
      .set('Cookie', authCookie!)
      .send(mealPlanInput)

    expect(mealPlanResponse.body.recipes).toHaveLength(recipeAmount)
  })

  it('fails when recipe amount exceeds household recipes amount', async () => {
    const { user, authCookie } = await loginUser(
      'def@google.com',
      'password123',
    )

    const userHouseholds = await getUserHouseholds(user.id)
    const householdId = userHouseholds[0].householdId

    const recipeAmount = 9
    const mealPlanInput = await generateMealPlanInputs(
      user,
      recipeAmount,
      'March madness',
      new Date(2026, 2, 10),
      new Date(2026, 2, 17),
      'random',
    )

    const mealPlanResponse = await request(app)
      .post(`/api/household/${householdId}/meal-plans`)
      .set('Cookie', authCookie!)
      .send(mealPlanInput)

    expect(mealPlanResponse.body.error).toEqual(
      'insufficient_household_recipes',
    )
  })
})
