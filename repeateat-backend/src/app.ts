import express, { Request, Response } from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './utils/auth'
import db from './db'
import { recipe } from './db/schema'

const app = express()

app.use(cors())
app.use('/api/auth/', toNodeHandler(auth))

app.use(express.json())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'Ok' })
})

app.get('/api/hello', (_req: Request, res: Response) => {
  console.log('Test')
  res.json({ message: 'Hello from backend again' })
})

app.post('/api/recipe', async (req: Request, res: Response) => {
  const name = req.body.name
  console.log(name)
  const response = await db.insert(recipe).values({ name: name })
  res.json(response)
})

export default app
