import {
  pgTable,
  integer,
  varchar,
  real,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const recipe = pgTable('recipe', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
})

export const ingredient = pgTable('ingredient', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
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
  (table) => [primaryKey({ columns: [table.recipeId, table.ingredientId] })]
)
