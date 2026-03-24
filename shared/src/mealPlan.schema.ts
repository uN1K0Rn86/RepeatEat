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

export const mealPlanSchema = z.object({
  recipes: z.array(recipeWithHistorySchema),
  id: z.number(),
  name: z.string().min(1),
  householdId: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
})

export type MealPlan = z.infer<typeof mealPlanSchema>
export type MealPlanPreference = z.infer<typeof mealPlanPreferenceSchema>
export type WeightedRecipe = z.infer<typeof weightedRecipeSchema>
export type CreateMealPlan = z.infer<typeof createMealPlanSchema>
export type CreateMealPlanFormValues = z.input<typeof createMealPlanSchema>
export type CreateMealPlanPayload = CreateMealPlanFormValues & {
  householdId: number
}
