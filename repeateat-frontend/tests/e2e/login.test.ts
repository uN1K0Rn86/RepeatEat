import { test, expect } from '@playwright/test'

test('Login page loads', async ({ page }) => {
  await page.goto('/login')

  await expect(page).toHaveURL(/\/login/)
  await expect(page.locator('body')).toBeVisible()
})

test('User can login with valid credentials', async ({ page }) => {
  await page.goto('/login')

  await page.getByTestId('email-input').fill('def@google.com')
  await page.getByTestId('password-input').fill('password123')

  try {
    await Promise.all([
      page.waitForURL((url) => url.pathname === '/', { timeout: 15000 }),
      page.getByRole('button', { name: 'Login' }).click(),
    ])
  } catch (err) {
    await page.screenshot({ path: 'debug-login-screenshot.png' })
    console.log('Current URL:', page.url())
    throw err
  }

  await expect(page.getByText('Household')).toBeVisible()
})

test('Login fails with invalid credentials', async ({ page }) => {
  await page.goto('/login')

  await page.getByTestId('email-input').fill('def@google.com')
  await page.getByTestId('password-input').fill('password125')

  await page.getByRole('button', { name: 'Login ' }).click()

  await expect(page.getByTestId('login-error')).toBeVisible()
})
