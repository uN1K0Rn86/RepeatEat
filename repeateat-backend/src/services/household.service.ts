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

export { createHousehold, getUserHouseholds }
