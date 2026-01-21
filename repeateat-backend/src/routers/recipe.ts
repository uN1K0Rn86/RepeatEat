import express, { Request, Response } from 'express'

import db from '../db'
import { recipe } from '../db/schema'

const recipeRouter = express.Router()

recipeRouter.post('/', async (req: Request, res: Response) => {
  const name: string = req.body.name
  const authorId: string = req.body.authorId
  const addedRecipe = await db
    .insert(recipe)
    .values({ name: name, authorId: authorId })
    .returning()
  res.json(addedRecipe)
})

export default recipeRouter
