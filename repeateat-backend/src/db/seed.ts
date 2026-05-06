import { and, eq, inArray } from 'drizzle-orm'
import type { AddRecipe } from '@repeateat/shared'
import { User } from 'better-auth/types'

import { auth } from '../utils/auth'
import { createRecipe } from '../services/recipe.service'
import {
  addCookingHistory,
  addHouseholdRecipe,
  getHouseholdRecipes,
} from '../services/household.service'

import * as schema from './schema'

import db from '.'
import { createMealPlan } from '../services/mealPlan.service'

export async function seed() {
  console.log('--- Seeding Database ---')

  const getOrCreateUser = async (input: {
    email: string
    password: string
    name: string
  }) => {
    const existing = await db.query.user.findFirst({
      where: eq(schema.user.email, input.email),
    })
    if (existing) return { ...existing }

    const created = await auth.api.signUpEmail({
      body: {
        email: input.email,
        password: input.password,
        name: input.name,
      },
    })

    return created.user
  }

  // Insert seeduser
  const seedUser = await getOrCreateUser({
    email: 'def@google.com',
    password: 'password123',
    name: 'default',
  })

  // Insert other users
  const otherUser = await getOrCreateUser({
    email: 'other@google.com',
    password: 'password123',
    name: 'other',
  })

  const memberUser = await getOrCreateUser({
    email: 'member@google.com',
    password: 'member123',
    name: 'member',
  })

  const otherMemberUser = await getOrCreateUser({
    email: 'othermember@google.com',
    password: 'member123',
    name: 'othermember',
  })

  const invitedUser = await getOrCreateUser({
    email: 'invited@google.com',
    password: 'invited123',
    name: 'invited',
  })

  // Insert categories
  const categoryNames = [
    'Italian',
    'Mexican',
    'Dessert',
    'Breakfast',
    'Vegan',
    'Quick & Easy',
  ]

  const existingCategories = await db
    .select({ name: schema.category.name })
    .from(schema.category)
    .where(inArray(schema.category.name, categoryNames))

  const existingCategoryNameSet = new Set(existingCategories.map((c) => c.name))
  const missingCategoryNames = categoryNames.filter(
    (name) => !existingCategoryNameSet.has(name),
  )

  if (missingCategoryNames.length > 0) {
    await db
      .insert(schema.category)
      .values(missingCategoryNames.map((name) => ({ name })))
      .onConflictDoNothing()
  }

  const categories = await db
    .select({ id: schema.category.id, name: schema.category.name })
    .from(schema.category)
    .where(inArray(schema.category.name, categoryNames))

  const categoryIds = categories.map((c) => c.id)

  // Insert Recipes

  const pickRandomCategoryIds = (min = 1, max = 2): number[] => {
    if (categoryIds.length === 0) return []
    const count = Math.min(
      categoryIds.length,
      Math.floor(Math.random() * (max - min + 1)) + min,
    )
    return [...categoryIds].sort(() => Math.random() - 0.5).slice(0, count)
  }

  const recipeSeedObjects: AddRecipe[] = [
    {
      name: 'Classic Pancakes',
      private: true,
      ingredients: [
        { name: 'Flour', quantity: 2, unit: 'cup' },
        { name: 'Milk', quantity: 3, unit: 'dl' },
        { name: 'Eggs', quantity: 2, unit: 'pcs' },
      ],
      steps: [{ content: 'Mix batter.' }, { content: 'Fry on pan.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Tomato Pasta',
      private: false,
      ingredients: [
        { name: 'Tomato', quantity: 4, unit: 'pcs' },
        { name: 'Garlic', quantity: 2, unit: 'clove' },
        { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
      ],
      steps: [
        { content: 'Cook pasta.' },
        { content: 'Make sauce and combine.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Soup',
      private: false,
      ingredients: [
        { name: 'Chicken', quantity: 300, unit: 'g' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      steps: [
        { content: 'Boil chicken.' },
        { content: 'Add onion and simmer.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Veggie Omelette',
      private: true,
      ingredients: [
        { name: 'Eggs', quantity: 3, unit: 'pcs' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Milk', quantity: 1, unit: 'tbsp' },
      ],
      steps: [{ content: 'Whisk eggs.' }, { content: 'Cook with onion.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Garlic Bread',
      private: false,
      ingredients: [
        { name: 'Flour', quantity: 3, unit: 'cup' },
        { name: 'Garlic', quantity: 3, unit: 'clove' },
        { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
      ],
      steps: [
        { content: 'Prepare dough.' },
        { content: 'Bake with garlic oil.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Simple Salad',
      private: true,
      ingredients: [
        { name: 'Tomato', quantity: 2, unit: 'pcs' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
      ],
      steps: [{ content: 'Chop all.' }, { content: 'Mix and season.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Egg Fried Rice',
      private: false,
      ingredients: [
        { name: 'Eggs', quantity: 2, unit: 'pcs' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      steps: [{ content: 'Scramble eggs.' }, { content: 'Fry with rice.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Tacos',
      private: false,
      ingredients: [
        { name: 'Chicken', quantity: 250, unit: 'g' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Tomato', quantity: 2, unit: 'pcs' },
      ],
      steps: [{ content: 'Cook chicken.' }, { content: 'Assemble tacos.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'French Toast',
      private: true,
      ingredients: [
        { name: 'Eggs', quantity: 2, unit: 'pcs' },
        { name: 'Milk', quantity: 2, unit: 'dl' },
        { name: 'Sugar', quantity: 1, unit: 'tbsp' },
      ],
      steps: [{ content: 'Dip bread.' }, { content: 'Fry both sides.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Tomato Soup',
      private: false,
      ingredients: [
        { name: 'Tomato', quantity: 5, unit: 'pcs' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Garlic', quantity: 2, unit: 'clove' },
      ],
      steps: [{ content: 'Cook vegetables.' }, { content: 'Blend and serve.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Pasta Bake',
      private: true,
      ingredients: [
        { name: 'Chicken', quantity: 300, unit: 'g' },
        { name: 'Milk', quantity: 2, unit: 'dl' },
        { name: 'Flour', quantity: 2, unit: 'tbsp' },
      ],
      steps: [
        { content: 'Cook pasta/chicken.' },
        { content: 'Bake with sauce.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Onion Rings',
      private: false,
      ingredients: [
        { name: 'Onion', quantity: 2, unit: 'pcs' },
        { name: 'Flour', quantity: 1, unit: 'cup' },
        { name: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      steps: [{ content: 'Slice and batter.' }, { content: 'Fry crispy.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Garlic Chicken Pan',
      private: false,
      ingredients: [
        { name: 'Chicken', quantity: 400, unit: 'g' },
        { name: 'Garlic', quantity: 4, unit: 'clove' },
        { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
      ],
      steps: [{ content: 'Sear chicken.' }, { content: 'Finish with garlic.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Sweet Milk Porridge',
      private: true,
      ingredients: [
        { name: 'Milk', quantity: 5, unit: 'dl' },
        { name: 'Sugar', quantity: 1, unit: 'tbsp' },
        { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      ],
      steps: [{ content: 'Heat milk.' }, { content: 'Cook until creamy.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Tomato Egg Scramble',
      private: false,
      ingredients: [
        { name: 'Tomato', quantity: 2, unit: 'pcs' },
        { name: 'Eggs', quantity: 3, unit: 'pcs' },
        { name: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      steps: [
        { content: 'Cook tomatoes.' },
        { content: 'Add eggs and scramble.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Olive Oil Flatbread',
      private: true,
      ingredients: [
        { name: 'Flour', quantity: 2, unit: 'cup' },
        { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
        { name: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      steps: [{ content: 'Make dough.' }, { content: 'Cook flatbreads.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Salad Bowl',
      private: false,
      ingredients: [
        { name: 'Chicken', quantity: 250, unit: 'g' },
        { name: 'Tomato', quantity: 2, unit: 'pcs' },
        { name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
      ],
      steps: [
        { content: 'Cook chicken.' },
        { content: 'Toss with vegetables.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Garlic Tomato Bruschetta',
      private: false,
      ingredients: [
        { name: 'Tomato', quantity: 3, unit: 'pcs' },
        { name: 'Garlic', quantity: 2, unit: 'clove' },
        { name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
      ],
      steps: [{ content: 'Dice toppings.' }, { content: 'Serve on toast.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Stir Fry',
      private: true,
      ingredients: [
        { name: 'Chicken', quantity: 300, unit: 'g' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Garlic', quantity: 2, unit: 'clove' },
      ],
      steps: [
        { content: 'Stir-fry chicken.' },
        { content: 'Add onion/garlic.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Milk Pancake Bites',
      private: false,
      ingredients: [
        { name: 'Flour', quantity: 1, unit: 'cup' },
        { name: 'Milk', quantity: 2, unit: 'dl' },
        { name: 'Eggs', quantity: 1, unit: 'pcs' },
      ],
      steps: [{ content: 'Mix batter.' }, { content: 'Fry small pancakes.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Tomato Chicken Stew',
      private: true,
      ingredients: [
        { name: 'Chicken', quantity: 350, unit: 'g' },
        { name: 'Tomato', quantity: 4, unit: 'pcs' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
      ],
      steps: [
        { content: 'Brown chicken.' },
        { content: 'Simmer with tomato.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Savory Egg Muffins',
      private: false,
      ingredients: [
        { name: 'Eggs', quantity: 4, unit: 'pcs' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Milk', quantity: 1, unit: 'dl' },
      ],
      steps: [{ content: 'Whisk mixture.' }, { content: 'Bake in molds.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Garlic Tomato Pasta Deluxe',
      private: false,
      ingredients: [
        { name: 'Tomato', quantity: 3, unit: 'pcs' },
        { name: 'Garlic', quantity: 3, unit: 'clove' },
        { name: 'Olive Oil', quantity: 2, unit: 'tbsp' },
      ],
      steps: [
        { content: 'Cook pasta.' },
        { content: 'Toss in garlic tomato sauce.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Rice Skillet',
      private: true,
      ingredients: [
        { name: 'Chicken', quantity: 300, unit: 'g' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      steps: [
        { content: 'Cook chicken and onion.' },
        { content: 'Add rice and steam.' },
      ],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Mini Sugar Cookies',
      private: true,
      ingredients: [
        { name: 'Flour', quantity: 2, unit: 'cup' },
        { name: 'Sugar', quantity: 1, unit: 'cup' },
        { name: 'Eggs', quantity: 1, unit: 'pcs' },
      ],
      steps: [{ content: 'Make dough.' }, { content: 'Bake until golden.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Tomato Onion Relish',
      private: false,
      ingredients: [
        { name: 'Tomato', quantity: 4, unit: 'pcs' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
        { name: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      steps: [{ content: 'Chop ingredients.' }, { content: 'Mix and rest.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Garlic Wrap',
      private: true,
      ingredients: [
        { name: 'Chicken', quantity: 250, unit: 'g' },
        { name: 'Garlic', quantity: 2, unit: 'clove' },
        { name: 'Onion', quantity: 1, unit: 'pcs' },
      ],
      steps: [{ content: 'Cook filling.' }, { content: 'Wrap and serve.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Milk Egg Custard',
      private: false,
      ingredients: [
        { name: 'Milk', quantity: 4, unit: 'dl' },
        { name: 'Eggs', quantity: 3, unit: 'pcs' },
        { name: 'Sugar', quantity: 2, unit: 'tbsp' },
      ],
      steps: [{ content: 'Mix ingredients.' }, { content: 'Bake gently.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Tomato Garlic Dip',
      private: false,
      ingredients: [
        { name: 'Tomato', quantity: 2, unit: 'pcs' },
        { name: 'Garlic', quantity: 1, unit: 'clove' },
        { name: 'Olive Oil', quantity: 1, unit: 'tbsp' },
      ],
      steps: [{ content: 'Roast ingredients.' }, { content: 'Blend smooth.' }],
      categories: pickRandomCategoryIds(),
    },
    {
      name: 'Chicken Onion Pie',
      private: true,
      ingredients: [
        { name: 'Chicken', quantity: 300, unit: 'g' },
        { name: 'Onion', quantity: 2, unit: 'pcs' },
        { name: 'Flour', quantity: 2, unit: 'cup' },
      ],
      steps: [{ content: 'Cook filling.' }, { content: 'Bake pie.' }],
      categories: pickRandomCategoryIds(),
    },
  ]

  const addedRecipeIds: number[] = []

  const recipeNames = recipeSeedObjects.map((r) => r.name)
  const existingRecipes = await db
    .select({ name: schema.recipe.name })
    .from(schema.recipe)
    .where(inArray(schema.recipe.name, recipeNames))

  const existingRecipeNameSet = new Set(existingRecipes.map((r) => r.name))

  for (const recipeToAdd of recipeSeedObjects) {
    if (existingRecipeNameSet.has(recipeToAdd.name)) continue
    const addedRecipe = await createRecipe(recipeToAdd, seedUser)
    addedRecipeIds.push(addedRecipe.id)
  }

  // Insert households function

  const insertHouseholds = async (
    householdNames: string[],
    adminUser: User,
    memberUser: User,
    invitedUser: User,
  ) => {
    return await db.transaction(async (tx) => {
      const existing = await tx
        .select({ id: schema.household.id, name: schema.household.name })
        .from(schema.household)
        .where(inArray(schema.household.name, householdNames))

      const existingNameSet = new Set(existing.map((h) => h.name))
      const missingNames = householdNames.filter((n) => !existingNameSet.has(n))

      if (missingNames.length > 0) {
        const insertedHouseholds = await tx
          .insert(schema.household)
          .values(missingNames.map((name) => ({ name })))
          .returning()

        const householdUserValues = insertedHouseholds.map((h) => ({
          householdId: h.id,
          userId: adminUser.id,
          role: 'admin' as const,
        }))
        await tx.insert(schema.householdUser).values(householdUserValues)

        const memberValues = insertedHouseholds.map((h) => ({
          householdId: h.id,
          userId: memberUser.id,
          role: 'member' as const,
        }))
        await tx.insert(schema.householdUser).values(memberValues)

        for (const h of insertedHouseholds) {
          const existingInvite = await tx.query.householdInvite.findFirst({
            where: and(
              eq(schema.householdInvite.householdId, h.id),
              eq(schema.householdInvite.email, invitedUser.email),
              eq(schema.householdInvite.status, 'pending'),
              eq(schema.householdInvite.invitedBy, adminUser.id),
            ),
          })

          if (existingInvite) continue

          const expiresAt = new Date()
          expiresAt.setDate(expiresAt.getDate() + 7)

          await tx.insert(schema.householdInvite).values({
            householdId: h.id,
            invitedBy: adminUser.id,
            email: invitedUser.email,
            status: 'pending',
            token: crypto.randomUUID(),
            expiresAt,
          })
        }
        return insertedHouseholds
      }
    })
  }

  // Insert households and invites with seeduser and otheruser

  const seedUserHouseholds = await insertHouseholds(
    ['Mekhar', 'Kellanved'],
    seedUser,
    memberUser,
    invitedUser,
  )
  const otherUserHouseholds = await insertHouseholds(
    ['Fiddler', 'Hedge'],
    otherUser,
    otherMemberUser,
    invitedUser,
  )

  // Add recipes to households

  for (const [index, recipeId] of addedRecipeIds.slice(0, 8).entries()) {
    // Generate sequential cookdates and several cookdates for selected recipes
    const cookedAt = new Date(2026, 2, 1)
    cookedAt.setDate(cookedAt.getDate() + index)
    const householdId = seedUserHouseholds![0].id
    await addCookingHistory({
      householdId,
      recipeId,
      cookedBy: seedUser.id,
      cookedAt,
    })
    if (index === 0) {
      cookedAt.setDate(cookedAt.getDate() - 2)
      await addCookingHistory({
        householdId,
        recipeId,
        cookedBy: seedUser.id,
        cookedAt,
      })
    }
    if ([0, 1].includes(index)) {
      cookedAt.setDate(cookedAt.getDate() - 4)
      await addCookingHistory({
        householdId,
        recipeId,
        cookedBy: seedUser.id,
        cookedAt,
      })
    }
    await addHouseholdRecipe(seedUser.id, householdId, recipeId)
  }

  for (const recipeId of addedRecipeIds.slice(4, 12)) {
    await addHouseholdRecipe(otherUser.id, otherUserHouseholds![0].id, recipeId)
  }

  // Insert meal plan

  const seedUserHouseholdId = seedUserHouseholds![0].id
  const seedUserHouseholdRecipes = (
    await getHouseholdRecipes(seedUserHouseholdId)
  ).map((r) => r.recipe)

  await createMealPlan(
    seedUserHouseholdId,
    seedUserHouseholdRecipes,
    3,
    'Seed meal plan',
    new Date(2026, 5, 6),
    new Date(2026, 5, 13),
    'balanced',
    seedUser,
  )

  console.log('--- Seeding Completed Successfully ---')
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err)
      process.exit(1)
    })
}
