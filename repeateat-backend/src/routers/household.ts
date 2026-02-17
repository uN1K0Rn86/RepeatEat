import express, { Response } from 'express'

import {
  createHousehold,
  getUserHouseholds,
} from '../services/household.service'
import { isAuthenticated, AuthRequest } from '../middleware/auth'

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

householdRouter.get(
  '/:id',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {},
)

export default householdRouter
