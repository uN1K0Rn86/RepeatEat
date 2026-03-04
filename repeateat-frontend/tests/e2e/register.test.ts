import { test, expect } from '@playwright/test'

test('register page loads', async ({ page }) => {
  await page.goto('/register')

  await expect(page).toHaveURL(/\/register/)
  await expect(page.locator('body')).toBeVisible()
})

test('registration is successful with valid inputs', async ({ page }) => {
  await page.goto('/register')

  await page.getByTestId('email-input').fill('playwright@test.example.com')
  await page.getByTestId('password-input').fill('password123')
  await page.getByTestId('confirmpassword-input').fill('password123')
  await page.getByTestId('username-input').fill('playwright')

  await page.getByRole('button', { name: 'Register' }).click()

  await expect(page.getByText('Create new household')).toBeVisible()
})
