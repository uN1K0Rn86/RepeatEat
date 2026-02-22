import request from 'supertest'
import { describe, it, expect } from 'vitest'

import app from '../app'
import { getAuthCookie } from '../__tests__/utils'

describe('Invite-related endpoints', () => {
  describe('POST /:id/accept', () => {
    it('succeeds when invite and user are valid', async () => {
      const authCookie = await getAuthCookie('invited@google.com', 'invited123')

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
})
