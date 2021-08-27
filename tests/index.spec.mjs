import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import { promisify } from 'util';
let devserver;
const resolveAfterDelay = promisify(setTimeout);

test.beforeAll(async () => {
  devserver = spawn('npm', ['run', 'test:server']);
  // The test runs too fast after this we need to delay it so dev server can start
  const result = await resolveAfterDelay(2000);
})

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  const title = page.locator('h2  >> nth=0');
  await expect(title).toContainText('changes');
});

test.afterAll(async () => {
  devserver.kill('SIGINT');
});
