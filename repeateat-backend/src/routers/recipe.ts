import express, { Request, Response } from 'express'

import db from '../db'
import { recipe } from '../db/schema'

const recipeRouter = express.Router()

recipeRouter.post('/api/recipe', async (req: Request, res: Response) => {
  const name = req.body.name
  console.log(name)
  const response = await db.insert(recipe).values({ name: name })
  res.json(response)
})

export default recipeRouter
