import express, { Request, Response } from 'express'
import { type Ingredient } from '@repeateat/shared'

import db from '../db'
import { recipe, ingredient, recipeIngredient } from '../db/schema'

const recipeRouter = express.Router()

// Recipes
recipeRouter.get('/', async (req: Request, res: Response) => {
  const allRecipes = await db.query.recipe.findMany({
    with: {
      ingredients: true,
      steps: true,
      categories: true,
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

// Ingredients
recipeRouter.get('/ingredient', async (_req: Request, res: Response) => {
  const allIngredients: Ingredient[] = await db.query.ingredient.findMany({
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

// Recipe Ingredients
recipeRouter.post('/:id/ingredients', async (req: Request, res: Response) => {
  const recipeId = Number(req.params.id)

  if (isNaN(recipeId)) {
    return res.status(400).json({ error: 'Invalid recipe ID' })
  }

  const ingredientIds = (req.body.ingredientIds || []) as string[]
  const quantities = (req.body.quantities || []) as string[]
  const units = (req.body.units || []) as string[]

  const ingredientData = ingredientIds.map((id, index) => ({
    recipeId,
    ingredientId: Number(id),
    quantity: Number(quantities[index]),
    unit: String(units[index]),
  }))

  if (ingredientData.length === 0) {
    return res.status(400).json({ error: 'No ingredients provided' })
  }

  try {
    const addedIngredients = await db
      .insert(recipeIngredient)
      .values(ingredientData)
      .returning()

    return res.json(addedIngredients)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Database insertion failed' })
  }
})

export default recipeRouter
