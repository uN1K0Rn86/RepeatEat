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

// Recipe Ingredients

const recipeIngredientBaseSchema = z.object({
  quantity: z.number(),
  unit: z.string(),
})

const recipeIngredientSchema = recipeIngredientBaseSchema.extend({
  recipeId: z.number(),
  ingredientId: z.number(),
})

const addRecipeIngredientSchema = recipeIngredientBaseSchema.extend({
  name: z.string().min(2, 'Ingredient name must be at least 2 characters'),
})

// Recipe Steps

const recipeStepBaseSchema = z.object({
  content: z.string().min(3, 'Step description must be at least 3 characters'),
})

const recipeStepSchema = recipeStepBaseSchema.extend({
  id: z.number(),
  recipeId: z.number(),
  stepNumber: z.number(),
})

const addRecipeStepSchema = recipeStepBaseSchema

// Categories

const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(2, 'Category must have a name'),
})

// Recipe Categories

const recipeCategorySchema = z.object({
  recipeId: z.number(),
  categoryId: z.number(),
})

// Recipes
const recipeBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
})

export const addRecipeSchema = recipeBaseSchema.extend({
  ingredients: z.array(addRecipeIngredientSchema),
  steps: z.array(addRecipeStepSchema),
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
export type Category = z.infer<typeof categorySchema>
