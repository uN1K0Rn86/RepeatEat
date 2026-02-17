import express, { Response } from 'express'

import { createHousehold } from '../services/household.service'
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

export default householdRouter
