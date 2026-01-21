import {
  pgTable,
  integer,
  varchar,
  real,
  primaryKey,
  text,
} from 'drizzle-orm/pg-core'

import { user } from './auth'

export const recipe = pgTable('recipe', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  authorId: text().references(() => user.id),
})

export const ingredient = pgTable('ingredient', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
})

export const category = pgTable('category', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).unique().notNull(),
})

export const recipeIngredient = pgTable(
  'recipe_ingredient',
  {
    recipeId: integer('recipe_id')
      .notNull()
      .references(() => recipe.id, { onDelete: 'cascade' }),
    ingredientId: integer('ingredient_id')
      .notNull()
      .references(() => ingredient.id, { onDelete: 'cascade' }),
    quantity: real().notNull(),
    unit: varchar({ length: 255 }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.ingredientId] })],
)

export const recipeStep = pgTable('recipe_step', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  recipeId: integer('recipe_id')
    .notNull()
    .references(() => recipe.id, { onDelete: 'cascade' }),
  stepNumber: integer('step_number').notNull(),
  content: text().notNull(),
})

export const recipeCategory = pgTable(
  'recipe_category',
  {
    recipeId: integer('recipe_id')
      .notNull()
      .references(() => recipe.id, { onDelete: 'cascade' }),
    categoryId: integer('category_id')
      .notNull()
      .references(() => category.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.recipeId, table.categoryId] })],
)
