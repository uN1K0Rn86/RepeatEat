import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'
import { getAuthCookie, getOtherHousehold } from '../__tests__/utils'
import { getAllHouseholds } from '../services/household.service'

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

  describe('POST /:id/recipe', () => {
    it('returns an object with correct message and data if user is in household and recipe exists', async () => {
      const authCookie = await getAuthCookie('def@google.com', 'password123')

      const householdResponse = await request(app)
        .get('/api/household')
        .set('Cookie', authCookie!)
      const householdId = householdResponse.body[0].householdId

      const recipeResponse = await request(app).get('/api/recipe')
      const recipeId = recipeResponse.body[0].id

      const householdRecipeResponse = await request(app)
        .post(`/api/household/${householdId}/recipe`)
        .set('Cookie', authCookie!)
        .send({ recipeId })

      expect(householdRecipeResponse.body.message).toEqual(
        'notify:household_recipe_added',
      )
      expect(householdRecipeResponse.body.data.householdId).toEqual(householdId)
      expect(householdRecipeResponse.body.data.recipeId).toEqual(recipeId)
    })

    it('fails when user is not a member of household', async () => {
      const otherHousehold = await getOtherHousehold(
        'def@google.com',
        'password123',
      )

      const authCookie = await getAuthCookie('def@google.com', 'password123')

      const recipeResponse = await request(app).get('/api/recipe')
      const recipeId = recipeResponse.body[0].id

      const householdRecipeResponse = await request(app)
        .post(`/api/household/${otherHousehold.id}/recipe`)
        .set('Cookie', authCookie!)
        .send({ recipeId })

      expect(householdRecipeResponse.body.error).toEqual(
        'errors:not_in_household',
      )
    })

    it('fails when user is not logged in', async () => {
      const allHouseholds = await getAllHouseholds()
      const householdId = allHouseholds[0].id

      const recipeResponse = await request(app).get('/api/recipe')
      const recipeId = recipeResponse.body[0].id

      const householdRecipeResponse = await request(app)
        .post(`/api/household/${householdId}/recipe`)
        .send({ recipeId })

      expect(householdRecipeResponse.body.error).toEqual('Unauthorized')
    })
  })
})
