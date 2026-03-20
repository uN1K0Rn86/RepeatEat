import { test, expect } from '@playwright/test'

test('Recipe page is reachable', async ({ page }) => {
  await page.goto('/recipe')

  await expect(page).toHaveURL(/\/recipe/)
  await expect(page.locator('body')).toBeVisible()
})

test('Seeded recipes are visible', async ({ page }) => {
  await page.goto('/recipe')

  await expect(page.getByText('Chicken Tacos')).toBeVisible()
  await expect(page.getByText('Milk Egg Custard')).toBeVisible()
  await expect(page.getByText('Tomato Onion Relish')).toBeVisible()
})

test('Clicking recipe leads to recipe details page', async ({ page }) => {
  await page.goto('/recipe')

  await page.getByText('Chicken Tacos').click()

  await expect(page.getByRole('cell', { name: 'Onion' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Tomato' })).toBeVisible()
})
