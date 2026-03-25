import express, { Response } from 'express'

import { AuthRequest, isAuthenticated } from '../middleware/auth'
import { AppError } from '../utils/errors'
import {
  getDefaultHouseholdId,
  getUserById,
  pendingInvites,
  searchByEmail,
  setDefaultHousehold,
} from '../services/user.service'
import { getUserHouseholds } from '../services/household.service'

const userRouter = express.Router()

userRouter.get(
  '/me',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const user = req.user

    const allInvites = await pendingInvites(user!)
    const invites = allInvites.filter((i) => i.status === 'pending')
    const row = await getDefaultHouseholdId(user!.id)
    const defaultHouseholdId = row?.defaultHouseholdId ?? null

    const userInfo = { ...user, invites, defaultHouseholdId }

    return res.json({ user: userInfo })
  },
)

userRouter.get(
  '/search',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const query = req.query.q as string

    if (!query || query.length < 3) throw new AppError('errors:too_short', 400)

    const users = await searchByEmail(query)

    return res.json(users)
  },
)

userRouter.put(
  '/profile/default-household',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const { newDefaultId } = req.body
    const userId = req.user!.id

    const userHouseholds = await getUserHouseholds(userId)
    const userHouseholdIds = userHouseholds.map((h) => h.householdId)

    if (!userHouseholdIds.includes(newDefaultId))
      throw new AppError('errors:not_in_household', 403)

    const updatedProfile = await setDefaultHousehold(userId, newDefaultId)

    res.status(200).json(updatedProfile)
  },
)

userRouter.get(
  '/:id',
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.id as string
    const user = await getUserById(userId)

    if (user === undefined) throw new AppError('errors:user_not_found', 404)

    res.status(200).json(user)
  },
)

export default userRouter
