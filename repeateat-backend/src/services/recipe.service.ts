import { sql, eq } from 'drizzle-orm'
import { User } from 'better-auth/types'
import {
  Recipe,
  AddRecipe,
  AddRecipeIngredient,
  UpdateRecipe,
} from '@repeateat/shared'

import db from '../db'
import {
  recipe,
  ingredient,
  recipeStep,
  recipeCategory,
  recipeIngredient,
} from '../db/schema'
import { AppError } from '../utils/errors'

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0]

// Recipes
const getAllRecipes = async () => {
  const allRecipes: Recipe[] = await db.query.recipe.findMany({
    with: {
      ingredients: true,
      steps: true,
      categories: true,
    },
    orderBy: (recipe, { asc }) => [asc(recipe.name)],
  })

  return allRecipes
}

const getFullRecipe = async (id: number) => {
  const recipe = await db.query.recipe.findFirst({
    where: (recipe, { eq }) => eq(recipe.id, id),
    with: {
      ingredients: {
        with: {
          ingredient: true,
        },
      },
      steps: true,
      categories: {
        with: {
          category: true,
        },
      },
    },
  })

  return recipe
}

const insertRecipeIngredients = async (
  tx: Transaction,
  recipeId: number,
  ingredients: AddRecipeIngredient[],
) => {
  const ingredientIds = await tx
    .insert(ingredient)
    .values(
      ingredients.map((ing) => ({
        name: ing.name,
      })),
    )
    .onConflictDoUpdate({
      target: ingredient.name,
      set: { name: sql`excluded.name` },
    })
    .returning({ id: ingredient.id })

  const ingredientsWithIds = ingredients.map((ing, index: number) => ({
    recipeId,
    ingredientId: ingredientIds[index].id,
    quantity: ing.quantity,
    unit: ing.unit,
  }))

  await tx.insert(recipeIngredient).values(ingredientsWithIds)
}

const createRecipe = async (recipeToAdd: AddRecipe, user: User) => {
  const { name, ingredients, steps, categories } = recipeToAdd

  const addedRecipe = await db.transaction(async (tx) => {
    const [newRecipe] = await tx
      .insert(recipe)
      .values({ name, authorId: user.id })
      .returning()

    if (ingredients?.length > 0) {
      await insertRecipeIngredients(tx, newRecipe.id, ingredients)
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

  return addedRecipe
}

const updateRecipe = async (recipeToUpdate: UpdateRecipe, user: User) => {
  const { name, id, authorId, ingredients, steps, categories } = recipeToUpdate

  if (user.id !== authorId) {
    throw new AppError('You can only edit your own recipes', 401)
  }

  const updatedRecipe = await db.transaction(async (tx) => {
    // Update recipe table
    await tx.update(recipe).set({ name: name })

    // Delete old recipe ingredients from recipe ingredient table
    await tx.delete(recipeIngredient).where(eq(recipeIngredient.recipeId, id))

    // Insert new recipe ingredients
    const newIngredients = ingredients.map((ing) => ({
      quantity: ing.quantity,
      unit: ing.unit,
      name: ing.ingredient.name,
    }))

    if (ingredients?.length > 0) {
      await insertRecipeIngredients(tx, id, newIngredients)
    }

    // Delete old recipe steps
    await tx.delete(recipeStep).where(eq(recipeStep.recipeId, id))

    // Insert new steps
    if (steps?.length > 0) {
      await tx.insert(recipeStep).values(
        steps.map((s, index) => ({
          recipeId: id,
          content: s.content,
          stepNumber: index + 1,
        })),
      )
    }

    // Delete old categories
    await tx.delete(recipeCategory).where(eq(recipeCategory.recipeId, id))

    // Insert new categories
    if (categories?.length > 0) {
      await tx.insert(recipeCategory).values(
        categories.map((cat) => ({
          recipeId: id,
          categoryId: cat.categoryId,
        })),
      )
    }

    return recipeToUpdate
  })
  return updatedRecipe
}

// Ingredients
const getAllIngredients = async () => {
  return await db.query.ingredient.findMany({
    orderBy: (ingredient, { asc }) => [asc(ingredient.name)],
  })
}

const createIngredient = async (name: string) => {
  return await db.insert(ingredient).values({ name: name }).returning()
}

// Categories
const getCategories = async () => {
  return await db.query.category.findMany({
    orderBy: (category, { asc }) => [asc(category.id)],
  })
}

export {
  getAllRecipes,
  getFullRecipe,
  createRecipe,
  updateRecipe,
  getAllIngredients,
  createIngredient,
  getCategories,
}
