import express, { Request, Response } from 'express'
import { sql } from 'drizzle-orm'
import {
  AddRecipe,
  AddRecipeIngredient,
  type Ingredient,
  type Recipe,
} from '@repeateat/shared'

import { isAuthenticated, AuthRequest } from '../middleware/auth'
import db from '../db'
import {
  recipe,
  ingredient,
  recipeIngredient,
  recipeStep,
  recipeCategory,
} from '../db/schema'

const recipeRouter = express.Router()

// Recipes
recipeRouter.get('/', async (req: Request, res: Response) => {
  const allRecipes: Recipe[] = await db.query.recipe.findMany({
    with: {
      ingredients: true,
      steps: true,
      categories: true,
    },
    orderBy: (recipe, { asc }) => [asc(recipe.name)],
  })

  res.json(allRecipes)
})

recipeRouter.post(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    try {
      const recipeToAdd: AddRecipe = req.body
      const { name, ingredients, steps, categories } = recipeToAdd
      const user = req.user

      if (!user) throw new Error('Not authenticated ')

      const result = await db.transaction(async (tx) => {
        const [newRecipe] = await tx
          .insert(recipe)
          .values({ name, authorId: user.id })
          .returning()

        if (ingredients?.length > 0) {
          const ingredientIds = await tx
            .insert(ingredient)
            .values(
              ingredients.map((ing: AddRecipeIngredient) => ({
                name: ing.name,
              })),
            )
            .onConflictDoUpdate({
              target: ingredient.name,
              set: { name: sql`excluded.name` },
            })
            .returning({ id: ingredient.id })

          const ingredientsWithIds = ingredients.map(
            (ing: AddRecipeIngredient, index: number) => ({
              recipeId: newRecipe.id,
              ingredientId: ingredientIds[index].id,
              quantity: ing.quantity,
              unit: ing.unit,
            }),
          )

          await tx.insert(recipeIngredient).values(ingredientsWithIds)
        }

        if (steps?.length > 0) {
          await tx.insert(recipeStep).values(
            steps.map((s, index) => ({
              recipeId: newRecipe.id,
              content: s.content,
              stepNumber: index + 1,
            })),
          )
        }

        if (categories?.length > 0) {
          await tx.insert(recipeCategory).values(
            categories.map((catId) => ({
              recipeId: newRecipe.id,
              categoryId: catId,
            })),
          )
        }

        const recipeToReturn = {
          ...recipeToAdd,
          id: newRecipe.id,
          authorId: newRecipe.authorId,
        }
        return recipeToReturn
      })
      return res.json(result)
    } catch (error) {
      console.error('Transaction failed:', error)
      res.status(500).json({ error: 'Failed to create full recipe' })
    }
  },
)

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

// Categories

recipeRouter.get('/category', async (_req: Request, res: Response) => {
  const allCategories = await db.query.category.findMany({
    orderBy: (category, { asc }) => [asc(category.id)],
  })

  res.json(allCategories)
})

export default recipeRouter
