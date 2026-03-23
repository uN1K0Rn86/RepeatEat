import { MealPlanPreference, RecipeWithHistory } from '@repeateat/shared'

import { sortHouseholdRecipes } from '../utils/recipes'

const createMealPlan = async (
  householdId: number,
  householdRecipes: RecipeWithHistory[],
  recipeAmount: number,
  name: string,
  startDate: Date,
  endDate: Date,
  preference: MealPlanPreference,
) => {
  if (householdRecipes.length < recipeAmount) return

  const sortedRecipes = sortHouseholdRecipes(householdRecipes, preference)
}

export { createMealPlan }
