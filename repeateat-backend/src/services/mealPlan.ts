import { MealPlanPreference, RecipeWithHistory } from '@repeateat/shared'
import { User } from 'better-auth/types'

import {
  pickWeightedRecipes,
  sortHouseholdRecipes,
  toWeightedRecipes,
} from '../utils/recipes'
import db from '../db'
import { mealPlan, mealPlanItem } from '../db/schema'

const createMealPlan = async (
  householdId: number,
  householdRecipes: RecipeWithHistory[],
  recipeAmount: number,
  name: string,
  startDate: Date,
  endDate: Date,
  preference: MealPlanPreference,
  user: User,
) => {
  if (householdRecipes.length < recipeAmount) return

  const sortedRecipes = sortHouseholdRecipes(householdRecipes, preference)
  const weightedRecipes = toWeightedRecipes(sortedRecipes, preference)
  const selectedRecipes = pickWeightedRecipes(weightedRecipes, recipeAmount)

  const newMealPlan = await db.transaction(async (tx) => {
    const [newMealPlan] = await tx
      .insert(mealPlan)
      .values({
        householdId,
        name,
        startDate,
        endDate,
        createdBy: user.id,
      })
      .returning()

    const mealPlanItems = selectedRecipes.map((recipe) => ({
      mealPlanId: newMealPlan.id,
      recipeId: recipe.id,
    }))

    await tx.insert(mealPlanItem).values(mealPlanItems)

    return newMealPlan
  })
}

export { createMealPlan }
