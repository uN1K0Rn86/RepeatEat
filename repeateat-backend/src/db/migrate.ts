import path from 'path'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const migrationsPath = path.resolve(__dirname, '../../migrations')

const runMigration = async () => {
  const connectionString = process.env.DATABASE_URL
  console.log(process.env.DATABASE_URL)
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined. Check your .env file.')
  }

  const sql = postgres(connectionString, { max: 1 })
  const db = drizzle(sql)

  console.log('Migrating from: ', migrationsPath)

  await migrate(db, { migrationsFolder: migrationsPath })

  console.log('Migrations completed!')
  await sql.end()
}

runMigration().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
