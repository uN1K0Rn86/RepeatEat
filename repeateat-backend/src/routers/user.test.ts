import request from 'supertest'
import app from '../app'
import { describe, it, expect } from 'vitest'

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

    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('user')
    expect(res.body.user.name).toBe('Test User')
  })
})
