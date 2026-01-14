import { integer, real, pgTable, varchar } from 'drizzle-orm/pg-core'

export const recipes = pgTable('recipes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
})

export const ingredients = pgTable('ingredients', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
})

export const recipeIngredients = pgTable('recipe_ingredients', {
  recipeId: integer('recipe_id')
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  ingredientId: integer('ingredient_id')
    .notNull()
    .references(() => ingredients.id, { onDelete: 'cascade' }),
  quantity: real().notNull(),
  unit: varchar({ length: 255 }).notNull(),
})
