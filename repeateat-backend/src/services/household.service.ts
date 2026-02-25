import { User } from 'better-auth/types'

import db from '../db'
import {
  household,
  householdInvite,
  householdRecipe,
  householdUser,
} from '../db/schema'

const createHousehold = async (name: string, user: User) => {
  return await db.transaction(async (tx) => {
    const [newHousehold] = await tx
      .insert(household)
      .values({ name })
      .returning()

    await tx
      .insert(householdUser)
      .values({ householdId: newHousehold.id, userId: user.id, role: 'admin' })

    return newHousehold
  })
}

const getAllHouseholds = async () => {
  return await db.query.household.findMany({})
}

const getUserHouseholds = async (userId: string) => {
  const results = await db.query.householdUser.findMany({
    where: (hu, { eq }) => eq(hu.userId, userId),
    with: {
      household: {
        with: {
          users: {
            with: {
              user: true,
            },
          },
        },
      },
    },
  })

  const userHouseholds = results.map((row) => ({
    householdId: row.householdId,
    role: row.role,
    name: row.household.name,
    members: row.household.users.map((u) => ({
      id: u.user.id,
      name: u.user.name,
      email: u.user.email,
      role: u.role,
      image: u.user.image,
    })),
  }))
  return userHouseholds
}

const getUserRole = async (householdId: number, userId: string) => {
  const result = await db.query.householdUser.findFirst({
    where: (hu, { and, eq }) =>
      and(eq(hu.userId, userId), eq(hu.householdId, householdId)),
    columns: {
      role: true,
    },
  })

  return result?.role
}

const existingHouseholdMember = async (householdId: number, email: string) => {
  const result = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, email),
    columns: {
      id: true,
    },
  })

  const userId = result?.id
  if (!userId) return false

  const existingMember = await db.query.householdUser.findFirst({
    where: (hu, { and, eq }) =>
      and(eq(hu.householdId, householdId), eq(hu.userId, userId)),
  })

  return Boolean(existingMember)
}

const inviteMember = async (
  householdId: number,
  userId: string,
  email: string,
) => {
  const token = crypto.randomUUID()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  const [newInvite] = await db
    .insert(householdInvite)
    .values({
      householdId,
      invitedBy: userId,
      email,
      status: 'pending',
      token,
      expiresAt,
    })
    .returning()

  return newInvite
}

const isMember = async (householdId: number, userId: string) => {
  const result = await db.query.householdUser.findFirst({
    where: (hu, { and, eq }) =>
      and(eq(hu.householdId, householdId), eq(hu.userId, userId)),
  })

  return Boolean(result)
}

const addHouseholdRecipe = async (
  userId: string,
  householdId: number,
  recipeId: number,
) => {
  const [newHouseholdRecipe] = await db
    .insert(householdRecipe)
    .values({
      householdId,
      recipeId,
      addedBy: userId,
    })
    .returning()

  return newHouseholdRecipe
}

const getHouseholdRecipes = async (householdId: number) => {
  const householdRecipes = await db.query.householdRecipe.findMany({
    where: (hr, { eq }) => eq(hr.householdId, householdId),
    with: {
      recipe: true,
    },
  })

  return householdRecipes
}

export {
  createHousehold,
  getAllHouseholds,
  getUserHouseholds,
  getUserRole,
  existingHouseholdMember,
  inviteMember,
  isMember,
  addHouseholdRecipe,
  getHouseholdRecipes,
}
