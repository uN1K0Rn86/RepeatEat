import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'
import { loginUser } from '../__tests__/utils'
import db from '../db'

describe('Invite-related endpoints', () => {
  describe('POST /:id/accept', () => {
    it('fails when the invite is not for the user in question', async () => {
      const { authCookie } = await loginUser('member@google.com', 'member123')

      const inviteFromDb = await db.query.householdInvite.findFirst({})
      const household = await db.query.household.findFirst({
        where: (h, { eq }) => eq(h.id, inviteFromDb!.householdId),
      })
      const inviteToFail = { ...inviteFromDb, household }

      const acceptResponse = await request(app)
        .post(`/api/invite/${inviteFromDb!.id}/accept`)
        .set('Cookie', authCookie!)
        .send(inviteToFail)

      expect(acceptResponse.body.error).toEqual('errors:wrong_invite')
    })

    it('fails when user is not logged in', async () => {
      const inviteFromDb = await db.query.householdInvite.findFirst({})
      const household = await db.query.household.findFirst({
        where: (h, { eq }) => eq(h.id, inviteFromDb!.householdId),
      })
      const inviteToFail = { ...inviteFromDb, household }

      const acceptResponse = await request(app)
        .post(`/api/invite/${inviteFromDb!.id}/accept`)
        .send(inviteToFail)

      expect(acceptResponse.body.error).toEqual('errors:must_login')
    })

    it('succeeds when invite and user are valid', async () => {
      const { authCookie } = await loginUser('invited@google.com', 'invited123')

      const userResponse = await request(app)
        .get('/api/user/me')
        .set('Cookie', authCookie!)

      const userInvite = userResponse.body.user.invites[0]

      const acceptResponse = await request(app)
        .post(`/api/invite/${userInvite.id}/accept`)
        .set('Cookie', authCookie!)
        .send(userInvite)

      expect(acceptResponse.body.status).toEqual('accepted')
    })
  })

  describe('POST /:id/decline', () => {
    it('fails when the invite is not for the user in question', async () => {
      const { authCookie } = await loginUser('member@google.com', 'member123')

      const inviteFromDb = await db.query.householdInvite.findFirst({})
      const household = await db.query.household.findFirst({
        where: (h, { eq }) => eq(h.id, inviteFromDb!.householdId),
      })
      const inviteToFail = { ...inviteFromDb, household }

      const acceptResponse = await request(app)
        .post(`/api/invite/${inviteFromDb!.id}/decline`)
        .set('Cookie', authCookie!)
        .send(inviteToFail)

      expect(acceptResponse.body.error).toEqual('errors:wrong_invite')
    })

    it('fails when user is not logged in', async () => {
      const inviteFromDb = await db.query.householdInvite.findFirst({})
      const household = await db.query.household.findFirst({
        where: (h, { eq }) => eq(h.id, inviteFromDb!.householdId),
      })
      const inviteToFail = { ...inviteFromDb, household }

      const acceptResponse = await request(app)
        .post(`/api/invite/${inviteFromDb!.id}/decline`)
        .send(inviteToFail)

      expect(acceptResponse.body.error).toEqual('errors:must_login')
    })

    it('succeeds when invite and user are valid', async () => {
      const { authCookie } = await loginUser('invited@google.com', 'invited123')

      const userResponse = await request(app)
        .get('/api/user/me')
        .set('Cookie', authCookie!)

      const userInvite = userResponse.body.user.invites[0]

      const acceptResponse = await request(app)
        .post(`/api/invite/${userInvite.id}/decline`)
        .set('Cookie', authCookie!)
        .send(userInvite)

      expect(acceptResponse.body.status).toEqual('declined')
    })
  })
})
