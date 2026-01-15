import express, { Request, Response } from 'express'
import { auth } from '../utils/auth'

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

  return res.json({ user: session.user })
})

export default userRouter
