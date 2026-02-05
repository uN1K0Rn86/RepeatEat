import { fromNodeHeaders } from 'better-auth/node'
import { Request, Response, NextFunction } from 'express'
import { User } from 'better-auth/types'

import { auth } from '../utils/auth'

export interface AuthRequest extends Request {
  user?: User
}

export const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  req.user = session.user
  next()
}
