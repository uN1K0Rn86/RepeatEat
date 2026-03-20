import { test, expect } from '@playwright/test'

test('Register page loads', async ({ page }) => {
  await page.goto('/register')

  await expect(page).toHaveURL(/\/register/)
  await expect(page.locator('body')).toBeVisible()
})

test('Registration is successful with valid inputs', async ({ page }) => {
  const uniqueEmail = `playwright_${Date.now()}@test.example.com`
  await page.goto('/register')

  await page.getByTestId('email-input').fill(uniqueEmail)
  await page.getByTestId('password-input').fill('password123')
  await page.getByTestId('confirmpassword-input').fill('password123')
  await page.getByTestId('username-input').fill('playwright')

  try {
    await Promise.all([
      page.waitForURL((url) => url.pathname === '/', { timeout: 15000 }),
      page.getByRole('button', { name: 'Register' }).click(),
    ])
  } catch (err) {
    await page.screenshot({
      path: `debug-register-screenshot-${Date.now()}.png`,
    })
    console.log('Current URL:', page.url())
    throw err
  }

  await expect(page.getByTestId('create-household')).toBeVisible()
})

test('Registration fails with invalid inputs', async ({ page }) => {
  const uniqueEmail = `playwright_${Date.now()}@test.example.com`
  await page.goto('/register')

  await page.getByTestId('email-input').fill(uniqueEmail)
  await page.getByTestId('password-input').fill('password123')
  await page.getByTestId('confirmpassword-input').fill('password124')
  await page.getByTestId('username-input').fill('playwright')

  await page.getByRole('button', { name: 'Register' }).click()

  await expect(page.getByTestId('confirm-error')).toBeVisible()
})
