import express, { Request, Response } from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './utils/auth'
import db from './db'
import { recipe } from './db/schema'
import userRouter from './routers/user'

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:8080',
      'http://localhost:5173',
      'http://192.168.100.114:8080',
      'http://192.168.100.114:5173',
    ],
    credentials: true,
  })
)
app.use('/api/auth/', toNodeHandler(auth))

app.use(express.json())

app.use('/api/user', userRouter)

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
