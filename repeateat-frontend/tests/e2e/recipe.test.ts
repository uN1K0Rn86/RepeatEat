import { test, expect } from '@playwright/test'

test('recipe page is reachable', async ({ page }) => {
  await page.goto('/recipe')

  await expect(page).toHaveURL(/\/recipe/)
  await expect(page.locator('body')).toBeVisible()
})
