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

export type MealPlanPreference = z.infer<typeof mealPlanPreferenceSchema>
export type WeightedRecipe = z.infer<typeof weightedRecipeSchema>
