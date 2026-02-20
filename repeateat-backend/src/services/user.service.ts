import { ilike } from 'drizzle-orm'
import { User } from 'better-auth/types'

import db from '../db'
import { user } from '../db/schema'

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

export { searchByEmail, pendingInvites }
