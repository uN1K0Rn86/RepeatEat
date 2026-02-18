import { ilike } from 'drizzle-orm'

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

export { searchByEmail }
