import { z } from 'zod'

// Ingredients
const ingredientBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
})

export const addIngredientSchema = ingredientBaseSchema

export const ingredientSchema = ingredientBaseSchema.extend({
  id: z.number().int().positive(),
})

// Recipe Ingredients

const recipeIngredientBaseSchema = z.object({
  quantity: z.number(),
  unit: z.string(),
})

const recipeIngredientSchema = recipeIngredientBaseSchema.extend({
  recipeId: z.number(),
  ingredientId: z.number(),
})

const recipeIngredientWithNameSchema = recipeIngredientSchema.extend({
  ingredient: ingredientSchema,
})

const addRecipeIngredientSchema = recipeIngredientBaseSchema.extend({
  name: z.string().min(2, 'Ingredient name must be at least 2 characters'),
})

const updateRecipeIngredientSchema = recipeIngredientBaseSchema.extend({
  ingredientId: z.number().optional(),
  recipeId: z.number(),
  ingredient: z.object({
    name: z.string().min(2, 'Ingredient name must be at least 2 characters'),
    id: z.number().optional(),
  }),
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

const updateRecipeStepSchema = recipeStepBaseSchema.extend({
  id: z.number().optional(),
  stepNumber: z.number(),
  recipeId: z.number(),
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

const recipeCategoryWithNameSchema = recipeCategorySchema.extend({
  category: categorySchema,
})

// Recipes
const recipeBaseSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  private: z.boolean(),
})

export const recipeDbSchema = recipeBaseSchema.extend({
  authorId: z.string(),
})

export const addRecipeSchema = recipeBaseSchema.extend({
  ingredients: z.array(addRecipeIngredientSchema),
  steps: z.array(addRecipeStepSchema),
  categories: z.array(z.number()),
})

export const recipeResponseSchema = addRecipeSchema.extend({
  id: z.number(),
})

export const recipeSchema = recipeBaseSchema.extend({
  id: z.number().int().positive(),
  ingredients: z.array(recipeIngredientSchema),
  steps: z.array(recipeStepSchema),
  categories: z.array(recipeCategorySchema),
  authorId: z.string().nullable(),
})

export const fullRecipeSchema = recipeBaseSchema.extend({
  id: z.number().int().positive(),
  ingredients: z.array(recipeIngredientWithNameSchema),
  steps: z.array(recipeStepSchema),
  categories: z.array(recipeCategoryWithNameSchema),
  authorId: z.string().nullable(),
})

export const updateRecipeSchema = recipeBaseSchema.extend({
  id: z.number().int().positive(),
  authorId: z.string().nullable(),
  ingredients: z.array(updateRecipeIngredientSchema),
  steps: z.array(updateRecipeStepSchema),
  categories: z.array(recipeCategoryWithNameSchema),
})

export type Recipe = z.infer<typeof recipeSchema>
export type FullRecipe = z.infer<typeof fullRecipeSchema>
export type AddRecipe = z.infer<typeof addRecipeSchema>
export type RecipeResponse = z.infer<typeof recipeResponseSchema>
export type UpdateRecipe = z.infer<typeof updateRecipeSchema>

export type Ingredient = z.infer<typeof ingredientSchema>
export type AddIngredient = z.infer<typeof addIngredientSchema>
export type AddRecipeIngredient = z.infer<typeof addRecipeIngredientSchema>
export type RecipeIngredientWithName = z.infer<
  typeof recipeIngredientWithNameSchema
>

export type RecipeStep = z.infer<typeof recipeStepSchema>

export type Category = z.infer<typeof categorySchema>
