import { relations } from 'drizzle-orm'

import { user, session, account, profile } from './tables/auth'
import {
  recipe,
  ingredient,
  category,
  recipeIngredient,
  recipeStep,
  recipeCategory,
} from './tables/recipe'
import {
  cookingHistory,
  household,
  householdInvite,
  householdRecipe,
  householdUser,
} from './tables/household'
import { mealPlan, mealPlanItem } from './tables/mealPlan'

export const userRelations = relations(user, ({ one, many }) => ({
  sessions: many(session),
  accounts: many(account),
  households: many(householdUser),
  recipes: many(recipe),
  invites: many(householdInvite),
  householdRecipes: many(householdRecipe),
  cookingHistory: many(cookingHistory),
  profile: one(profile, { fields: [user.id], references: [profile.userId] }),
  mealPlans: many(mealPlan),
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

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  ingredients: many(recipeIngredient),
  households: many(householdRecipe),
  steps: many(recipeStep),
  categories: many(recipeCategory),
  author: one(user, { fields: [recipe.authorId], references: [user.id] }),
  cookingHistory: many(cookingHistory),
}))

export const ingredientRelations = relations(ingredient, ({ many }) => ({
  recipes: many(recipeIngredient),
}))

export const categoryRelations = relations(category, ({ many }) => ({
  recipeCategories: many(recipeCategory),
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
  }),
)

export const recipeStepRelations = relations(recipeStep, ({ one }) => ({
  recipe: one(recipe, {
    fields: [recipeStep.recipeId],
    references: [recipe.id],
  }),
}))

export const recipeCategoryRelations = relations(recipeCategory, ({ one }) => ({
  recipe: one(recipe, {
    fields: [recipeCategory.recipeId],
    references: [recipe.id],
  }),
  category: one(category, {
    fields: [recipeCategory.categoryId],
    references: [category.id],
  }),
}))

export const householdRelations = relations(household, ({ many }) => ({
  users: many(householdUser),
  recipes: many(householdRecipe),
  invites: many(householdInvite),
  cookingHistory: many(cookingHistory),
  isDefault: many(profile),
  mealPlans: many(mealPlan),
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
    user: one(user, {
      fields: [householdRecipe.addedBy],
      references: [user.id],
    }),
  }),
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

export const householdInviteRelations = relations(
  householdInvite,
  ({ one }) => ({
    household: one(household, {
      fields: [householdInvite.householdId],
      references: [household.id],
    }),
    user: one(user, {
      fields: [householdInvite.invitedBy],
      references: [user.id],
    }),
  }),
)

export const cookingHistoryRelations = relations(cookingHistory, ({ one }) => ({
  household: one(household, {
    fields: [cookingHistory.householdId],
    references: [household.id],
  }),
  recipe: one(recipe, {
    fields: [cookingHistory.recipeId],
    references: [recipe.id],
  }),
  user: one(user, {
    fields: [cookingHistory.cookedBy],
    references: [user.id],
  }),
}))

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
  defaultHousehold: one(household, {
    fields: [profile.defaultHouseholdId],
    references: [household.id],
  }),
}))

export const mealPlanRelations = relations(mealPlan, ({ one, many }) => ({
  householdId: one(household, {
    fields: [mealPlan.householdId],
    references: [household.id],
  }),
  createdById: one(user, {
    fields: [mealPlan.createdBy],
    references: [user.id],
  }),
  mealPlanItems: many(mealPlanItem),
}))

export const mealPlanItemRelations = relations(mealPlanItem, ({ one }) => ({
  mealPlan: one(mealPlan, {
    fields: [mealPlanItem.mealPlanId],
    references: [mealPlan.id],
  }),
  recipe: one(recipe, {
    fields: [mealPlanItem.recipeId],
    references: [recipe.id],
  }),
  assignedToUserId: one(user, {
    fields: [mealPlanItem.assignedToUserId],
    references: [user.id],
  }),
}))
