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

    return { ...newMealPlan, recipes: selectedRecipes }
  })

  return newMealPlan
}

const getMealPlans = async (householdId: number) => {
  const mealPlans = await db.query.mealPlan.findMany({
    where: (mealPlan, { eq }) => eq(mealPlan.householdId, householdId),
    with: {
      mealPlanItems: true,
    },
  })

  return mealPlans
}

export { createMealPlan, getMealPlans }
