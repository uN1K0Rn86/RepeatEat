import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'

describe('Household-related endpoints', () => {
  describe('POST /', () => {
    it('succeeds when user is authenticated', async () => {
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

      const newHousehold = { name: 'Orlong' }

      const response = await request(app)
        .post('/api/household')
        .set('Cookie', authCookie!)
        .send(newHousehold)

      expect(response.body.name).toEqual('Orlong')
    })

    it('fails when user is not authenticated', async () => {
      const failedHousehold = { name: 'Rake' }

      const response = await request(app)
        .post('/api/household')
        .send(failedHousehold)

      expect(response.body.error).toEqual('Unauthorized')
    })
  })
})
