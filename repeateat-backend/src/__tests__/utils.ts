import request from 'supertest'
import { eq, notInArray } from 'drizzle-orm'

import app from '../app'
import db from '../db'
import { household, householdUser } from '../db/schema'

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
