import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright'

let devserver;
const resolveAfterDelay = promisify(setTimeout);

test.beforeAll(async () => {
  devserver = spawn('npm', ['run', 'test:server']);
  // The test runs too fast after this we need to delay it so dev server can start
  const result = await resolveAfterDelay(3000);
})

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:8000/about-us/about-dcc/');
  const title = page.locator('h1  >> nth=0');
  await expect(title).toContainText('About');
  await injectAxe(page)
  await checkA11y(page)
});

test.afterAll(async () => {
  devserver.kill('SIGINT');
});
