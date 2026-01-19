import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'

const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL

console.log('NODE_ENV: ', process.env.NODE_ENV)
console.log('DBURL: ', dbUrl)
const db = drizzle(dbUrl!)

export default db
