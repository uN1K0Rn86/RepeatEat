import {
  pgTable,
  integer,
  text,
  timestamp,
  date,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { household } from './household'
import { user } from './auth'
import { recipe } from './recipe'

export const mealTypeEnum = pgEnum('meal_type', [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
])

export const mealPlan = pgTable('meal_plan', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  householdId: integer('household_id')
    .notNull()
    .references(() => household.id, { onDelete: 'cascade' }),
  name: text(),
  startDate: timestamp('start_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  endDate: timestamp('end_date', { withTimezone: true })
    .default(sql`now() + interval '7 days'`)
    .notNull(),
  createdBy: text('created_by')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const mealPlanItem = pgTable('meal_plan_item', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mealPlanId: integer('meal_plan_id')
    .notNull()
    .references(() => mealPlan.id, { onDelete: 'cascade' }),
  date: date(),
  mealType: mealTypeEnum('meal_type'),
  recipeId: integer('recipe_id').references(() => recipe.id),
  title: text(),
  assignedToUserId: text().references(() => user.id),
})
