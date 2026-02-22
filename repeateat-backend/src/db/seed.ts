import { auth } from '../utils/auth'

import * as schema from './schema'

import db from '.'

export async function seed() {
  console.log('--- Seeding Database ---')

  // Insert seeduser
  const seedUser = await auth.api.signUpEmail({
    body: {
      email: 'def@google.com',
      password: 'password123',
      name: 'default',
    },
  })

  // Insert other users
  const otherUser = await auth.api.signUpEmail({
    body: {
      email: 'other@google.com',
      password: 'password123',
      name: 'other',
    },
  })

  const memberUser = await auth.api.signUpEmail({
    body: {
      email: 'member@google.com',
      password: 'member123',
      name: 'member',
    },
  })

  const invitedUser = await auth.api.signUpEmail({
    body: {
      email: 'invited@google.com',
      password: 'invited123',
      name: 'invited',
    },
  })

  const seedUserId = seedUser.user.id
  const otherUserId = otherUser.user.id
  const memberUserId = memberUser.user.id

  // Inser categories
  const categoryNames = [
    'Italian',
    'Mexican',
    'Dessert',
    'Breakfast',
    'Vegan',
    'Quick & Easy',
  ]
  const categories = await db
    .insert(schema.category)
    .values(categoryNames.map((name) => ({ name })))
    .onConflictDoNothing()
    .returning()

  // Insert ingredients
  const ingredientNames = [
    'Tomato',
    'Flour',
    'Sugar',
    'Salt',
    'Chicken',
    'Garlic',
    'Onion',
    'Olive Oil',
    'Milk',
    'Eggs',
  ]
  const ingredients = await db
    .insert(schema.ingredient)
    .values(ingredientNames.map((name) => ({ name })))
    .returning()

  // Insert recipes
  for (let i = 1; i <= 10; i++) {
    const [newRecipe] = await db
      .insert(schema.recipe)
      .values({
        name: `Recipe #${i}: ${['Pasta', 'Tacos', 'Cake', 'Salad', 'Soup'][i % 5]}`,
        authorId: seedUserId,
        private: false,
      })
      .returning()

    // Insert recipe ingredients
    const selectedIngredients = ingredients
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    const recipeIngs = selectedIngredients.map((ing) => ({
      recipeId: newRecipe.id,
      ingredientId: ing.id,
      quantity: Math.floor(Math.random() * 5) + 1,
      unit: ['grams', 'cups', 'tbsp', 'pieces'][Math.floor(Math.random() * 4)],
    }))

    await db.insert(schema.recipeIngredient).values(recipeIngs)

    // Insert recipe steps
    const steps = [
      {
        recipeId: newRecipe.id,
        stepNumber: 1,
        content: 'Prep your ingredients and wash the vegetables.',
      },
      {
        recipeId: newRecipe.id,
        stepNumber: 2,
        content: 'Combine everything in a large bowl and mix well.',
      },
      {
        recipeId: newRecipe.id,
        stepNumber: 3,
        content: 'Cook on medium heat until golden brown.',
      },
    ]
    await db.insert(schema.recipeStep).values(steps)

    // Insert recipe categories
    if (categories.length > 0) {
      await db.insert(schema.recipeCategory).values({
        recipeId: newRecipe.id,
        categoryId:
          categories[Math.floor(Math.random() * categories.length)].id,
      })
    }
  }

  // Insert households with seeduser
  const householdsWithUser = [{ name: 'Mekhar' }, { name: 'Kellanved' }]
  await db.transaction(async (tx) => {
    const insertedHouseholds = await tx
      .insert(schema.household)
      .values(householdsWithUser)
      .returning()

    const householdUserValues = insertedHouseholds.map((h) => ({
      householdId: h.id,
      userId: seedUserId,
      role: 'admin' as const,
    }))
    await tx.insert(schema.householdUser).values(householdUserValues)

    const memberValues = insertedHouseholds.map((h) => ({
      householdId: h.id,
      userId: memberUserId,
      role: 'member' as const,
    }))
    await tx.insert(schema.householdUser).values(memberValues)
  })

  // Insert households with other user
  const householdsWithOtherUser = [{ name: 'Fiddler' }, { name: 'Hedge' }]
  await db.transaction(async (tx) => {
    const insertedHouseholds = await tx
      .insert(schema.household)
      .values(householdsWithOtherUser)
      .returning()

    const householdUserValues = insertedHouseholds.map((h) => ({
      householdId: h.id,
      userId: otherUserId,
      role: 'admin' as const,
    }))
    await tx.insert(schema.householdUser).values(householdUserValues)
  })

  // Insert invite

  await db.transaction(async (tx) => {
    const household = await tx.query.household.findFirst({
      where: (h, { eq }) => eq(h.name, 'Mekhar'),
    })

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await tx.insert(schema.householdInvite).values({
      householdId: household!.id,
      invitedBy: seedUserId,
      email: invitedUser.user.email,
      status: 'pending',
      token: crypto.randomUUID(),
      expiresAt,
    })
  })

  console.log('--- Seeding Completed Successfully ---')
}

if (require.main === module) {
  seed()
    .then(process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err)
      process.exit(1)
    })
}
