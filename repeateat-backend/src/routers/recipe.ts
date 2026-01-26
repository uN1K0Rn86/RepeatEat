import express, { Request, Response } from 'express'

import db from '../db'
import { recipe, ingredient } from '../db/schema'

const recipeRouter = express.Router()

recipeRouter.get('/', async (req: Request, res: Response) => {
  const allRecipes = await db.query.recipe.findMany({
    with: {
      ingredients: true,
      steps: true,
    },
    orderBy: (recipe, { asc }) => [asc(recipe.name)],
  })

  res.json(allRecipes)
})

recipeRouter.post('/', async (req: Request, res: Response) => {
  const name: string = req.body.name
  const authorId: string = req.body.authorId
  const addedRecipe = await db
    .insert(recipe)
    .values({ name: name, authorId: authorId })
    .returning()
  res.json(addedRecipe)
})

recipeRouter.get('/ingredient', async (_req: Request, res: Response) => {
  const allIngredients = await db.query.ingredient.findMany({
    orderBy: (ingredient, { asc }) => [asc(ingredient.name)],
  })

  res.json(allIngredients)
})

recipeRouter.post('/ingredient', async (req: Request, res: Response) => {
  const name: string = req.body.name
  const addedIngredient = await db
    .insert(ingredient)
    .values({ name: name })
    .returning()
  res.json(addedIngredient)
})

export default recipeRouter
