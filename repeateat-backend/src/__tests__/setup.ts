import { beforeAll, afterAll } from 'vitest'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import db from '../db'
import { user, session, account, verification } from '../db/tables/auth'
import { recipe, ingredient, recipeIngredient } from '../db/tables/recipe'
import {
  household,
  householdUser,
  householdRecipe,
} from '../db/tables/household'

beforeAll(async () => {
  await migrate(db, { migrationsFolder: './migrations' })
  console.log('Tests starting with migrated database')
})

afterAll(async () => {
  try {
    console.log('Clearing database...')
    await db.delete(recipeIngredient)
    await db.delete(ingredient)
    await db.delete(recipe)
    await db.delete(householdRecipe)
    await db.delete(householdUser)
    await db.delete(household)
    await db.delete(account)
    await db.delete(session)
    await db.delete(verification)
    await db.delete(user)
    console.log('Database reset after test')
  } catch (error) {
    console.error('Error resetting database:', error)
  }
})
