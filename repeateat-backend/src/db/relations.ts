import { relations } from 'drizzle-orm'
import { user, session, account } from './tables/auth'
import { recipe, ingredient, recipeIngredient } from './tables/recipe'
import { household, householdRecipe, householdUser } from './tables/household'

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  households: many(householdUser),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const recipeRelations = relations(recipe, ({ many }) => ({
  ingredients: many(recipeIngredient),
  households: many(householdRecipe),
}))

export const ingredientRelations = relations(ingredient, ({ many }) => ({
  recipes: many(recipeIngredient),
}))

export const recipeIngredientRelations = relations(
  recipeIngredient,
  ({ one }) => ({
    recipe: one(recipe, {
      fields: [recipeIngredient.recipeId],
      references: [recipe.id],
    }),
    ingredient: one(ingredient, {
      fields: [recipeIngredient.ingredientId],
      references: [ingredient.id],
    }),
  })
)

export const householdRelations = relations(household, ({ many }) => ({
  users: many(householdUser),
  recipes: many(householdRecipe),
}))

export const householdRecipeRelations = relations(
  householdRecipe,
  ({ one }) => ({
    household: one(household, {
      fields: [householdRecipe.householdId],
      references: [household.id],
    }),
    recipe: one(recipe, {
      fields: [householdRecipe.recipeId],
      references: [recipe.id],
    }),
  })
)

export const householdUserRelations = relations(householdUser, ({ one }) => ({
  household: one(household, {
    fields: [householdUser.householdId],
    references: [household.id],
  }),
  user: one(user, {
    fields: [householdUser.userId],
    references: [user.id],
  }),
}))
