import {
  MealPlan,
  MealPlanItem,
  MealPlanPreference,
  RecipeWithHistory,
} from '@repeateat/shared'
import { User } from 'better-auth/types'

import {
  pickWeightedRecipes,
  sortHouseholdRecipes,
  toWeightedRecipes,
} from '../utils/recipes'
import db from '../db'
import { mealPlan, mealPlanItem } from '../db/schema'
import { inArray, sql } from 'drizzle-orm'

type MealPlanItemId = MealPlanItem['id']
type RecipeId = RecipeWithHistory['id']

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
      mealPlanItems: {
        with: {
          recipe: true,
        },
      },
    },
  })

  return mealPlans
}

const updateMealPlan = async (
  mealPlanToUpdate: MealPlan,
  removedRecipes: MealPlanItemId[],
  newRecipeIds: RecipeId[],
) => {
  const updatedMealPlan = await db.transaction(async (tx) => {
    if (removedRecipes.length > 0) {
      await tx
        .delete(mealPlanItem)
        .where(inArray(mealPlanItem.id, removedRecipes))
    }

    if (newRecipeIds.length > 0) {
      const newMealPlanItems = newRecipeIds.map((rId) => ({
        mealPlanId: mealPlanToUpdate.id,
        recipeId: rId,
      }))
      await tx.insert(mealPlanItem).values(newMealPlanItems)
    }

    const [updatedMealPlanData] = await tx
      .update(mealPlan)
      .set({
        updatedAt: sql`NOW()`,
        startDate: mealPlanToUpdate.startDate,
        endDate: mealPlanToUpdate.endDate,
        name: mealPlanToUpdate.name,
      })
      .returning()

    return updatedMealPlanData
  })
  return updatedMealPlan
}

export { createMealPlan, getMealPlans, updateMealPlan }
