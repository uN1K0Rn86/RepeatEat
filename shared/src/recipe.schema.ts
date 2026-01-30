import { z } from 'zod'

// Ingredients
const ingredientBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
})

export const addIngredientSchema = ingredientBaseSchema

export const ingredientSchema = ingredientBaseSchema.extend({
  id: z.number().int().positive(),
})

export type Ingredient = z.infer<typeof ingredientSchema>
export type AddIngredient = z.infer<typeof addIngredientSchema>

// Recipe Properties

const recipeIngredientSchema = z.object({
  recipeId: z.number(),
  ingredientId: z.number(),
  quantity: z.number(),
  unit: z.string(),
})

const recipeStepSchema = z.object({
  id: z.number(),
  recipeId: z.number(),
  stepNumber: z.number(),
  content: z.string(),
})

const recipeCategorySchema = z.object({
  recipeId: z.number(),
  categoryId: z.number(),
})

// Recipes
const recipeBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
})

export const addRecipeSchema = recipeBaseSchema.extend({
  ingredients: z.array(z.number()),
  steps: z.array(z.number()),
  categories: z.array(z.number()),
})

export const recipeSchema = recipeBaseSchema.extend({
  id: z.number().int().positive(),
  ingredients: z.array(recipeIngredientSchema),
  steps: z.array(recipeStepSchema),
  categories: z.array(recipeCategorySchema),
  authorId: z.string().nullable(),
})

export type Recipe = z.infer<typeof recipeSchema>
export type AddRecipe = z.infer<typeof addRecipeSchema>
