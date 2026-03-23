import { MealPlanPreference, RecipeWithHistory } from '@repeateat/shared'

const sortHouseholdRecipes = (
  householdRecipes: RecipeWithHistory[],
  preference: MealPlanPreference,
) => {
  if (preference === 'balanced') {
    return [...householdRecipes].sort((a, b) => {
      const aTime = a.cookingHistory[0]?.cookedAt?.getTime() ?? 0
      const bTime = b.cookingHistory[0]?.cookedAt?.getTime() ?? 0
      return aTime - bTime
    })
  }

  if (preference === 'favorites') {
    return [...householdRecipes].sort((a, b) => {
      return b.cookingHistory.length - a.cookingHistory.length
    })
  }

  return [...householdRecipes]
}

export { sortHouseholdRecipes }
