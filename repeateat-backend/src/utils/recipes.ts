import {
  MealPlanPreference,
  RecipeWithHistory,
  WeightedRecipe,
} from '@repeateat/shared'

const sortHouseholdRecipes = (
  householdRecipes: RecipeWithHistory[],
  preference: MealPlanPreference,
) => {
  if (preference === 'balanced') {
    // Sort oldest first
    return [...householdRecipes].sort((a, b) => {
      const aTime = a.cookingHistory[0]?.cookedAt?.getTime() ?? 0
      const bTime = b.cookingHistory[0]?.cookedAt?.getTime() ?? 0
      return aTime - bTime
    })
  }

  if (preference === 'favorites') {
    // Sort most cooked first
    return [...householdRecipes].sort((a, b) => {
      return b.cookingHistory.length - a.cookingHistory.length
    })
  }

  return [...householdRecipes]
}

const toWeightedRecipes = (
  sortedRecipes: RecipeWithHistory[],
  preference: MealPlanPreference,
): WeightedRecipe[] => {
  if (preference === 'random') {
    return sortedRecipes.map((recipe) => ({ recipe, weight: 1 }))
  }

  return sortedRecipes.map((recipe, index) => ({
    recipe,
    weight: sortedRecipes.length - index,
  }))
}

const pickWeightedRecipes = (
  weightedRecipes: WeightedRecipe[],
  amount: number,
): RecipeWithHistory[] => {
  const pool = [...weightedRecipes]
  const picked: RecipeWithHistory[] = []

  while (picked.length < amount && pool.length > 0) {
    const totalWeight = pool.reduce((sum, recipe) => sum + recipe.weight, 0)
    let r = Math.random() * totalWeight

    let chosenIndex = 0
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i].weight
      if (r <= 0) {
        chosenIndex = i
        break
      }
    }

    picked.push(pool[chosenIndex].recipe)
    pool.splice(chosenIndex, 1)
  }

  return picked
}

export { sortHouseholdRecipes, toWeightedRecipes, pickWeightedRecipes }
