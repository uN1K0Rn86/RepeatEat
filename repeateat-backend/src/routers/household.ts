import express, { Response } from 'express'

import {
  createHousehold,
  getUserHouseholds,
  getUserRole,
} from '../services/household.service'
import { isAuthenticated, AuthRequest } from '../middleware/auth'
import { AppError } from '../utils/errors'

const householdRouter = express.Router()

householdRouter.post(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const name = req.body.name
    const user = req.user

    const newHousehold = await createHousehold(name, user!)

    return res.json(newHousehold)
  },
)

householdRouter.get(
  '/',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const user = req.user

    const households = await getUserHouseholds(user!.id)
    res.json(households)
  },
)

householdRouter.post(
  '/:id/invites',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const user = req.user
    const { householdId, email } = req.body

    const userRole = await getUserRole(householdId, user!.id)

    if (userRole !== 'admin')
      throw new AppError('Only admins can invite new members', 403)
  },
)

export default householdRouter
