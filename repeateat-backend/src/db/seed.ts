import * as schema from './schema'

import db from '.'

export async function seed() {
  console.log('--- Seeding Database ---')

  const [seedUser] = await db
    .insert(schema.user)
    .values({
      id: 'user_default',
      name: 'default',
      email: 'def@google.com',
      emailVerified: false,
    })
    .onConflictDoNothing()
    .returning()

  const authorId = seedUser?.id || 'user_default'

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

  for (let i = 1; i <= 10; i++) {
    const [newRecipe] = await db
      .insert(schema.recipe)
      .values({
        name: `Recipe #${i}: ${['Pasta', 'Tacos', 'Cake', 'Salad', 'Soup'][i % 5]}`,
        authorId: authorId,
      })
      .returning()

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

    if (categories.length > 0) {
      await db.insert(schema.recipeCategory).values({
        recipeId: newRecipe.id,
        categoryId:
          categories[Math.floor(Math.random() * categories.length)].id,
      })
    }
  }

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
