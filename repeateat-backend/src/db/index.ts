import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'

const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL

const db = drizzle(dbUrl!, { schema })

export default db
