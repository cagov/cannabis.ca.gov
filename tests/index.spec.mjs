import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
let devserver;




function resolveAfterDelay(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, seconds);
  });
}

test.beforeAll(async () => {
  devserver = spawn('npm', ['run', 'test:server']);
  const result = await resolveAfterDelay(5000);
})

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  const title = page.locator('h2  >> nth=0');
  await expect(title).toContainText('changes');
});

test.afterAll(async () => {
  devserver.kill('SIGINT');
});
