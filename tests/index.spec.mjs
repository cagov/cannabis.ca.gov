import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://headless.cannabis.ca.gov/');
  const title = page.locator('h2  >> nth=0');
  await expect(title).toContainText('changes');
});