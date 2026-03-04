import { test, expect } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('body')).toBeVisible()
})

test('navbar link to recipe page works', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Recipes' }).click()
  const searchBar = page.getByPlaceholder('search')
  await expect(searchBar).toBeVisible()
})

test('navigation to register page works', async ({ page }) => {
  await page.goto('/')

  await page.getByText('Get started').click()
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible()
})

test('navigation to login page works', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('login-nav').click()
  await expect(page.getByText('Email')).toBeVisible()
  await expect(page.getByText('Password')).toBeVisible()
})
