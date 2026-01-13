import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'Ok' })
})

app.get('/api/hello', (_req: Request, res: Response) => {
  console.log('Test')
  res.json({ message: 'Hello from backend again' })
})

export default app
