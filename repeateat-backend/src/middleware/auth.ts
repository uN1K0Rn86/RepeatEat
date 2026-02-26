import { fromNodeHeaders } from 'better-auth/node'
import { Request, Response, NextFunction } from 'express'
import { User } from 'better-auth/types'

import { auth } from '../utils/auth'
import { AppError } from '../utils/errors'

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
    throw new AppError('errors:must_login', 401)
  }

  req.user = session.user
  next()
}
