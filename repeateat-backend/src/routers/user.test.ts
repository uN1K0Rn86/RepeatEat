import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'
import { getOtherHousehold, loginUser } from '../__tests__/utils'
import { getUserHouseholds } from '../services/household.service'

describe('User endpoints', () => {
  const testEmail = 'test@example.com'
  const testPassword = 'PasswordTest123!'

  it('registration should succeed with valid credentials', async () => {
    const res = await request(app).post('/api/auth/sign-up/email').send({
      email: testEmail,
      password: testPassword,
      name: 'Test User',
    })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.email).toBe(testEmail)
  })

  it('login should succeed with valid credentials', async () => {
    const res = await request(app).post('/api/auth/sign-in/email').send({
      email: testEmail,
      password: testPassword,
    })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.name).toBe('Test User')
  })

  it('login should fail with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/sign-in/email').send({
      email: testEmail,
      password: 'TestPassword123!',
    })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid email or password')
  })

  describe('PUT /profile/default-household', () => {
    it('succeeds when user does not have a profile yet but is authenticated', async () => {
      const { user, authCookie } = await loginUser(
        'def@google.com',
        'password123',
      )
      const userHouseholds = await getUserHouseholds(user.id)
      const newDefaultId = userHouseholds[0].householdId

      const profileResponse = await request(app)
        .put('/api/user/profile/default-household')
        .set('Cookie', authCookie!)
        .send({ newDefaultId })

      expect(profileResponse.body.userId).toEqual(user.id)
      expect(profileResponse.body.defaultHouseholdId).toEqual(newDefaultId)
    })

    it('fails when user is not a member of the household', async () => {
      const { user, authCookie } = await loginUser(
        'def@google.com',
        'password123',
      )
      const otherHousehold = await getOtherHousehold(user.id)

      const profileResponse = await request(app)
        .put('/api/user/profile/default-household')
        .set('Cookie', authCookie!)
        .send({ newDefaultId: otherHousehold.id })

      expect(profileResponse.body.error).toEqual('errors:not_in_household')
    })
  })
})
