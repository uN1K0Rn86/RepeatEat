import {
  pgTable,
  integer,
  varchar,
  text,
  primaryKey,
} from 'drizzle-orm/pg-core'

import { user } from './auth'
import { recipe } from './recipe'

export const household = pgTable('household', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
})

export const householdUser = pgTable(
  'household_user',
  {
    householdId: integer('household_id')
      .notNull()
      .references(() => household.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.householdId, table.userId] })],
)

export const householdRecipe = pgTable(
  'household_recipe',
  {
    householdId: integer('household_id')
      .notNull()
      .references(() => household.id, { onDelete: 'cascade' }),
    recipeId: integer('recipe_id')
      .notNull()
      .references(() => recipe.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.householdId, table.recipeId] })],
)
