import { sql } from 'drizzle-orm'
import { User } from 'better-auth/types'
import { Recipe, AddRecipe, AddRecipeIngredient } from '@repeateat/shared'

import db from '../db'
import {
  recipe,
  ingredient,
  recipeStep,
  recipeCategory,
  recipeIngredient,
} from '../db/schema'

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

const createRecipe = async (recipeToAdd: AddRecipe, user: User) => {
  const { name, ingredients, steps, categories } = recipeToAdd

  const addedRecipe = await db.transaction(async (tx) => {
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

  return addedRecipe
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
  getAllIngredients,
  createIngredient,
  getCategories,
}
