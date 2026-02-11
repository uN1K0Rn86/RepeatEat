import express, { Request, Response } from 'express'
import { AddRecipe, type Ingredient, type Recipe } from '@repeateat/shared'

import { isAuthenticated, AuthRequest } from '../middleware/auth'
import {
  createIngredient,
  createRecipe,
  getAllIngredients,
  getAllRecipes,
  getCategories,
  getFullRecipe,
} from '../services/recipe.service'

const recipeRouter = express.Router()

// Ingredients
recipeRouter.get('/ingredient', async (_req: Request, res: Response) => {
  const allIngredients: Ingredient[] = await getAllIngredients()

  res.json(allIngredients)
})

recipeRouter.post('/ingredient', async (req: Request, res: Response) => {
  const name: string = req.body.name
  const addedIngredient = await createIngredient(name)
  res.json(addedIngredient)
})

// Categories

recipeRouter.get('/category', async (_req: Request, res: Response) => {
  const allCategories = await getCategories()

  res.json(allCategories)
})

export default recipeRouter

// Recipes
recipeRouter.get('/', async (_req: Request, res: Response) => {
  const allRecipes: Recipe[] = await getAllRecipes()
  res.json(allRecipes)
})

recipeRouter.get('/:id', async (req: Request, res: Response) => {
  const recipeId = Number(req.params.id)

  if (isNaN(recipeId)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  try {
    const recipeToReturn = await getFullRecipe(recipeId)

    if (!recipeToReturn) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    return res.json(recipeToReturn)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

recipeRouter.post(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    try {
      const recipeToAdd: AddRecipe = req.body
      const user = req.user

      if (!user) throw new Error('Not authenticated ')

      const addedRecipe = await createRecipe(recipeToAdd, user)

      return res.json(addedRecipe)
    } catch (error) {
      console.error('Transaction failed:', error)
      res.status(500).json({ error: 'Failed to create full recipe' })
    }
  },
)

recipeRouter.put('/:id', async (req: Request, res: Response) => {})
