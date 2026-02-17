import { User } from 'better-auth/types'

import db from '../db'
import { household, householdUser } from '../db/schema'

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

const getUserHouseholds = async (userId: string) => {
  const userHouseholds = db.query.householdUser.findMany({
    where: (householdUser, { eq }) => eq(householdUser.userId, userId),
    with: {
      household: true,
    },
  })

  return userHouseholds
}

export { createHousehold, getUserHouseholds }
