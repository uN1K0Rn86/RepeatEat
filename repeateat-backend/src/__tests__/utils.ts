import request from 'supertest'
import { eq, notInArray } from 'drizzle-orm'

import app from '../app'
import db from '../db'
import { household, householdUser } from '../db/schema'

export const getAuthCookie = async (email: string, password: string) => {
  const loginResponse = await request(app)
    .post('/api/auth/sign-in/email')
    .send({ email, password })

  return loginResponse.get('Set-Cookie')
}

export const getOtherHousehold = async (email: string, password: string) => {
  const loginResponse = await request(app)
    .post('/api/auth/sign-in/email')
    .send({ email, password })

  const userId = loginResponse.body.user.id

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
