import express, { Request, Response } from 'express'

const app = express()

app.use(express.json())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'Ok' })
})

app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from backend' })
})

export default app
