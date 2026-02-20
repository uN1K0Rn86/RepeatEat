import express, { Request, Response } from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'

import { auth } from './utils/auth'
import { errorHandler } from './middleware/errorHandler'
import userRouter from './routers/user'
import recipeRouter from './routers/recipe'
import householdRouter from './routers/household'
import inviteRouter from './routers/invite'

const app = express()

app.use(cors())
app.use('/api/auth/', toNodeHandler(auth))

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/recipe', recipeRouter)
app.use('/api/household', householdRouter)
app.use('/api/invite', inviteRouter)

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'Ok' })
})

app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from backend again' })
})

app.use(errorHandler)

export default app
