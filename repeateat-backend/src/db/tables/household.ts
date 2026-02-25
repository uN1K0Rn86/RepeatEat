import {
  pgTable,
  integer,
  varchar,
  text,
  primaryKey,
  pgEnum,
  timestamp,
} from 'drizzle-orm/pg-core'

import { user } from './auth'
import { recipe } from './recipe'

export const roleEnum = pgEnum('user_role', ['admin', 'member'])
export const statusEnum = pgEnum('status', ['accepted', 'pending', 'declined'])

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
    role: roleEnum('role').notNull().default('member'),
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
    addedBy: text('added_by').references(() => user.id, {
      onDelete: 'set null',
    }),
  },
  (table) => [primaryKey({ columns: [table.householdId, table.recipeId] })],
)

export const householdInvite = pgTable('household_invite', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  householdId: integer('household_id')
    .notNull()
    .references(() => household.id, { onDelete: 'cascade' }),
  invitedBy: text('invited_by')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  email: text().notNull(),
  status: statusEnum('status').notNull().default('pending'),
  token: text('token').notNull(),
  sentAt: timestamp('sent_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
})
