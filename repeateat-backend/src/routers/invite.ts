import express, { Response } from 'express'
import { Invite } from '@repeateat/shared'

import { AuthRequest, isAuthenticated } from '../middleware/auth'
import { acceptInvite } from '../services/invite.service'
import { AppError } from '../utils/errors'

const inviteRouter = express.Router()

inviteRouter.post(
  '/:id/accept',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const user = req.user
    const invite: Invite = req.body

    if (invite.email !== user!.email) {
      console.log('invite: ', invite.email, 'user: ', user?.email)
      throw new AppError('errors:wrong_invite', 403)
    }

    const acceptedInvite = await acceptInvite(invite, user!.id)
    return res.json({ ...acceptedInvite, household: invite.household })
  },
)

export default inviteRouter
