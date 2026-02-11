import express, { Request, Response } from 'express'
import {
  type AddRecipe,
  type UpdateRecipe,
  type Ingredient,
  type Recipe,
} from '@repeateat/shared'

import { isAuthenticated, AuthRequest } from '../middleware/auth'
import {
  createIngredient,
  createRecipe,
  getAllIngredients,
  getAllRecipes,
  getCategories,
  getFullRecipe,
  updateRecipe,
} from '../services/recipe.service'
import { AppError } from '../utils/errors'

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

// Recipes
recipeRouter.get('/', async (_req: Request, res: Response) => {
  const allRecipes: Recipe[] = await getAllRecipes()
  res.json(allRecipes)
})

recipeRouter.get('/:id', async (req: Request, res: Response) => {
  const recipeId = Number(req.params.id)

  if (isNaN(recipeId)) {
    throw new AppError('Invalid ID format', 400)
  }

  const recipeToReturn = await getFullRecipe(recipeId)

  if (!recipeToReturn) {
    throw new AppError('Recipe not found', 404)
  }

  return res.json(recipeToReturn)
})

recipeRouter.post(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const recipeToAdd: AddRecipe = req.body
    const user = req.user

    if (!user) throw new AppError('Authentication required', 401)

    const addedRecipe = await createRecipe(recipeToAdd, user)

    return res.json(addedRecipe)
  },
)

recipeRouter.put(
  '/:id',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const recipeToUpdate: UpdateRecipe = req.body
    const user = req.user

    if (!user) throw new AppError('Authentication required', 401)

    const updatedRecipe = await updateRecipe(recipeToUpdate, user)

    return res.json(updatedRecipe)
  },
)

export default recipeRouter
