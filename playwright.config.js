// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run test:server',
    port: 8000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};
module.exports = config;