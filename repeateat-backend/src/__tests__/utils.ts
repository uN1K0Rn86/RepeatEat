import request from 'supertest'

import app from '../app'

export const getAuthCookie = async (email: string, password: string) => {
  const loginResponse = await request(app)
    .post('/api/auth/sign-in/email')
    .send({ email, password })

  return loginResponse.get('Set-Cookie')
}
