import express, { Response } from 'express'

import { isAuthenticated, AuthRequest } from '../middleware/auth'
import { AppError } from '../utils/errors'
import { createMealPlan } from '../services/mealPlan'

const mealPlanRouter = express.Router({ mergeParams: true })

mealPlanRouter.get(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    // Placeholder
    const householdId = Number(req.params.id)

    return res.json({ householdId })
  },
)

mealPlanRouter.post('/', async (req: AuthRequest, res: Response) => {
  const householdId = Number(req.params.id)
  const {
    householdRecipes,
    recipeAmount,
    name,
    startDate,
    endDate,
    preference,
  } = req.body
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
})

export default mealPlanRouter
