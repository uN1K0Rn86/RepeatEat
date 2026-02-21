import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'
import { getAuthCookie } from '../__tests__/utils'

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

  describe('GET /', () => {
    it('returns all household objects for the logged in user', async () => {
      const authCookie = await getAuthCookie('def@google.com', 'password123')

      const userHouseholdsResponse = await request(app)
        .get('/api/household')
        .set('Cookie', authCookie!)
      const userHouseholds = userHouseholdsResponse.body

      expect(userHouseholds.length).toEqual(2)
      expect(userHouseholds[0].name).toEqual('Mekhar')
    })
  })

  describe('POST /:id/invites', () => {
    it('returns valid invite response when invite is valid', async () => {
      const authCookie = await getAuthCookie('def@google.com', 'password123')

      const householdResponse = await request(app)
        .get('/api/household')
        .set('Cookie', authCookie!)

      const householdId = householdResponse.body[0].householdId
      const emailToInvite = 'kruppe@daru.com'

      const inviteResponse = await request(app)
        .post(`/api/household/${householdId}/invites`)
        .send({ email: emailToInvite })
        .set('Cookie', authCookie!)

      const newInvite = inviteResponse.body

      expect(newInvite.message).toEqual('notify:invite_success')
      expect(newInvite.data.email).toEqual('kruppe@daru.com')
      expect(newInvite.data.status).toEqual('pending')
    })

    it('fails when user is not logged in', async () => {
      const authCookie = await getAuthCookie('def@google.com', 'password123')

      const householdResponse = await request(app)
        .get('/api/household')
        .set('Cookie', authCookie!)

      const householdId = householdResponse.body[0].householdId
      const emailToInvite = 'kruppe@daru.com'

      const inviteResponse = await request(app)
        .post(`/api/household/${householdId}/invites`)
        .send({ email: emailToInvite })

      const failedInvite = inviteResponse.body
      expect(failedInvite.error).toEqual('Unauthorized')
    })

    it('fails when user is a member, not admin of household', async () => {
      const authCookie = await getAuthCookie('member@google.com', 'member123')

      const householdResponse = await request(app)
        .get('/api/household')
        .set('Cookie', authCookie!)

      const householdId = householdResponse.body[0].householdId
      const emailToInvite = 'kruppe@daru.com'

      const inviteResponse = await request(app)
        .post(`/api/household/${householdId}/invites`)
        .send({ email: emailToInvite })
        .set('Cookie', authCookie!)

      expect(inviteResponse.body.error).toEqual('errors:only_admin')
    })

    it('fails when invited user is already a member', async () => {
      const authCookie = await getAuthCookie('def@google.com', 'password123')

      const householdResponse = await request(app)
        .get('/api/household')
        .set('Cookie', authCookie!)

      const householdId = householdResponse.body[0].householdId
      const emailToInvite = 'member@google.com'

      const inviteResponse = await request(app)
        .post(`/api/household/${householdId}/invites`)
        .send({ email: emailToInvite })
        .set('Cookie', authCookie!)

      expect(inviteResponse.body.error).toEqual('errors:existing_member')
    })
  })
})
