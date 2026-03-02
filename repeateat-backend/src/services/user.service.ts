import { eq, ilike } from 'drizzle-orm'
import type {
  NodePgTransaction,
  NodePgDatabase,
} from 'drizzle-orm/node-postgres'
import { User } from 'better-auth/types'

import db from '../db'
import { profile, user, household } from '../db/schema'

const searchByEmail = async (search: string) => {
  const result = await db
    .select({
      email: user.email,
    })
    .from(user)
    .where(ilike(user.email, `%${search}%`))
    .limit(10)

  return result
}

const pendingInvites = async (user: User) => {
  const result = await db.query.householdInvite.findMany({
    where: (hi, { eq }) => eq(hi.email, user.email),
    with: {
      household: true,
    },
  })

  return result
}

const getDefaultHouseholdId = async (userId: string) => {
  const [result] = await db
    .select({ defaultHouseholdId: profile.defaultHouseholdId })
    .from(profile)
    .where(eq(profile.userId, userId))

  return result
}

type DbOrTx = NodePgDatabase<any> | NodePgTransaction<any, any>

const setDefaultHousehold = async (
  userId: string,
  newDefaultId: number,
  trx: DbOrTx = db,
) => {
  await trx
    .insert(profile)
    .values({
      userId,
      defaultHouseholdId: newDefaultId,
    })
    .onConflictDoUpdate({
      target: profile.userId,
      set: {
        defaultHouseholdId: newDefaultId,
      },
    })
    .returning()

  const [result] = await trx
    .select({
      userId: profile.userId,
      defaultHouseholdId: profile.defaultHouseholdId,
      householdName: household.name,
    })
    .from(profile)
    .leftJoin(household, eq(profile.defaultHouseholdId, household.id))
    .where(eq(profile.userId, userId))

  return result
}

export {
  searchByEmail,
  pendingInvites,
  getDefaultHouseholdId,
  setDefaultHousehold,
}
