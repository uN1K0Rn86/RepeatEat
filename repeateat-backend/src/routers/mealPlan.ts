import express, { Response } from 'express'
import { createMealPlanSchema } from '@repeateat/shared'

import { isAuthenticated, AuthRequest } from '../middleware/auth'
import { AppError } from '../utils/errors'
import {
  createMealPlan,
  getMealPlans,
  updateMealPlan,
} from '../services/mealPlan.service'

const mealPlanRouter = express.Router({ mergeParams: true })

mealPlanRouter.get(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const householdId = Number(req.params.id)
    const mealPlans = await getMealPlans(householdId)

    return res.json(mealPlans)
  },
)

mealPlanRouter.post(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const householdId = Number(req.params.id)
    const body = createMealPlanSchema.parse(req.body)

    const {
      householdRecipes,
      recipeAmount,
      name,
      startDate,
      endDate,
      preference,
    } = body
    const user = req.user!

    if (householdRecipes.length < recipeAmount)
      throw new AppError('errors:insufficient_household_recipes', 422)

    const newMealPlan = await createMealPlan(
      householdId,
      householdRecipes,
      recipeAmount,
      name,
      startDate,
      endDate,
      preference,
      user,
    )

    return res.status(201).json(newMealPlan)
  },
)

mealPlanRouter.put(
  '/:id',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const mealPlanId = Number(req.params.id)
    const { mealPlanToUpdate, removedRecipes, newRecipeIds } = req.body

    if (mealPlanId !== mealPlanToUpdate.id) {
      throw new AppError('errors:mealplan_ids_not_matching', 400)
    }

    const mealPlanWithDates = {
      ...mealPlanToUpdate,
      startDate: new Date(mealPlanToUpdate.startDate),
      endDate: new Date(mealPlanToUpdate.endDate),
    }

    const updatedMealPlan = await updateMealPlan(
      mealPlanWithDates,
      removedRecipes,
      newRecipeIds,
    )

    return res.json(updatedMealPlan)
  },
)

export default mealPlanRouter
