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
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  preference: mealPlanPreferenceSchema,
})

export const mealPlanBaseSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  householdId: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
})

export const mealPlanResponseSchema = mealPlanBaseSchema.extend({
  recipes: z.array(recipeWithHistorySchema),
})

export const mealTypeEnum = z.enum([
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  null,
])

export const mealPlanItemSchema = z.object({
  id: z.number(),
  recipeId: z.number().nullable(),
  date: z.date().nullable(),
  mealPlanId: z.number(),
  mealType: mealTypeEnum,
  title: z.string().nullable(),
  assignedToUserId: z.string().nullable(),
})

export const mealPlanItemWithRecipeSchema = mealPlanItemSchema.extend({
  recipe: z
    .object({
      id: z.number(),
      name: z.string(),
      authorId: z.string().nullable(),
      private: z.boolean(),
    })
    .nullable(),
})

export const mealPlanSchema = mealPlanBaseSchema.extend({
  mealPlanItems: z.array(mealPlanItemWithRecipeSchema),
})

export type MealPlan = z.infer<typeof mealPlanSchema>
export type MealPlanItem = z.infer<typeof mealPlanItemSchema>
export type MealPlanResponse = z.infer<typeof mealPlanResponseSchema>
export type MealPlanPreference = z.infer<typeof mealPlanPreferenceSchema>
export type WeightedRecipe = z.infer<typeof weightedRecipeSchema>
export type CreateMealPlan = z.infer<typeof createMealPlanSchema>
export type CreateMealPlanFormValues = z.input<typeof createMealPlanSchema>
export type CreateMealPlanPayload = CreateMealPlanFormValues & {
  householdId: number
}
