import express, { Request, Response } from 'express'

import { auth } from '../utils/auth'
import { AuthRequest, isAuthenticated } from '../middleware/auth'
import { AppError } from '../utils/errors'
import { pendingInvites, searchByEmail } from '../services/user.service'

const userRouter = express.Router()

userRouter.get('/me', async (req: Request, res: Response) => {
  // Convert Express headers to Fetch API Headers
  const fetchHeaders = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') {
      fetchHeaders.append(key, value)
    } else if (Array.isArray(value)) {
      for (const v of value) {
        fetchHeaders.append(key, v)
      }
    }
  }

  const session = await auth.api.getSession({
    headers: fetchHeaders,
  })

  if (!session?.user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const invites = await pendingInvites(session.user)
  console.log(invites)

  const user = { ...session.user, invites }

  return res.json({ user })
})

userRouter.get(
  '/search',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const query = req.query.q as string

    if (!query || query.length < 3) throw new AppError('errors:too_short', 400)

    const users = await searchByEmail(query)

    return res.json(users)
  },
)

export default userRouter
