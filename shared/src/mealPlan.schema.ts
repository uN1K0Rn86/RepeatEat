import { z } from 'zod'
import { recipeWithHistorySchema } from './household.schema'

export const mealPlanPreferenceSchema = z.enum([
  'balanced',
  'random',
  'favorites',
])

export const weightedRecipeSchema = z.object({
  recipe: recipeWithHistorySchema,
  weight: z.number(),
})

export const createMealPlanSchema = z.object({
  householdRecipes: z.array(recipeWithHistorySchema),
  recipeAmount: z.number().int().positive(),
  name: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  preference: mealPlanPreferenceSchema,
})

export type MealPlanPreference = z.infer<typeof mealPlanPreferenceSchema>
export type WeightedRecipe = z.infer<typeof weightedRecipeSchema>
