import express, { Response } from 'express'
import { createMealPlanSchema } from '@repeateat/shared'

import { isAuthenticated, AuthRequest } from '../middleware/auth'
import { AppError } from '../utils/errors'
import { createMealPlan, getMealPlans } from '../services/mealPlan.service'

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
      throw new AppError('insufficient_household_recipes', 422)

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

export default mealPlanRouter
