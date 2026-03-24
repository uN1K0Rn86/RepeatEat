import request from 'supertest'
import { eq, notInArray } from 'drizzle-orm'
import { User } from 'better-auth/types'
import { MealPlanPreference } from '@repeateat/shared'

import app from '../app'
import db from '../db'
import { household, householdUser } from '../db/schema'
import {
  getHouseholdRecipes,
  getUserHouseholds,
} from '../services/household.service'

export const loginUser = async (email: string, password: string) => {
  const loginResponse = await request(app)
    .post('/api/auth/sign-in/email')
    .send({ email, password })

  const authCookie = loginResponse.get('Set-Cookie')
  const user = loginResponse.body.user

  return { user, authCookie }
}

export const getOtherHousehold = async (userId: string) => {
  const userHouseholdIds = db
    .select({ id: householdUser.householdId })
    .from(householdUser)
    .where(eq(householdUser.userId, userId))

  const result = await db
    .select()
    .from(household)
    .where(notInArray(household.id, userHouseholdIds))
    .limit(1)

  return result[0]
}

export const generateMealPlanInputs = async (
  user: User,
  recipeAmount: number,
  name: string,
  startDate: Date,
  endDate: Date,
  preference: MealPlanPreference,
) => {
  const userHouseholds = await getUserHouseholds(user.id)
  const householdId = userHouseholds[0].householdId
  const householdRecipes = await getHouseholdRecipes(householdId)
  const formattedHouseholdRecipes = householdRecipes.map((r) => r.recipe)

  return {
    householdRecipes: formattedHouseholdRecipes,
    recipeAmount,
    name,
    startDate,
    endDate,
    preference,
  }
}
