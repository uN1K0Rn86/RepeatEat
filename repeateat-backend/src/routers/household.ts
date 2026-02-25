import express, { Response } from 'express'

import {
  addHouseholdRecipe,
  createHousehold,
  existingHouseholdMember,
  getUserHouseholds,
  getUserRole,
  inviteMember,
  isMember,
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
    const householdId = Number(req.params.id)
    const { email } = req.body

    const userRole = await getUserRole(householdId, user!.id)

    if (userRole !== 'admin') throw new AppError('errors:only_admin', 403)

    const existingMember = await existingHouseholdMember(householdId, email)
    if (existingMember) {
      throw new AppError('errors:existing_member', 400)
    }

    const newInvite = await inviteMember(householdId, user!.id, email)

    return res.status(201).json({
      message: 'notify:invite_success',
      data: {
        id: newInvite.id,
        email: newInvite.email,
        status: newInvite.status,
        sentAt: newInvite.sentAt,
        expiresAt: newInvite.expiresAt,
      },
    })
  },
)

householdRouter.post(
  '/:id/recipe',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const user = req.user
    const householdId = Number(req.params.id)
    const recipeId = Number(req.body.recipeId)
    console.log(user, householdId, recipeId)

    const userInHousehold = await isMember(householdId, user!.id)
    if (!userInHousehold) throw new AppError('errors:not_in_household', 403)

    // Admins and members can add recipes
    const addedHouseholdRecipe = await addHouseholdRecipe(
      user!.id,
      householdId,
      recipeId,
    )

    return res.status(201).json({
      message: 'notify:household_recipe_added',
      data: addedHouseholdRecipe,
    })
  },
)

export default householdRouter
