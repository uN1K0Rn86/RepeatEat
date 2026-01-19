import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'

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
})
