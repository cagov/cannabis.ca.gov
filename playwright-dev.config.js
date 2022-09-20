const config = {
  fullyParallel: true,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    baseURL: 'http://localhost:3000',
    retries: process.env.CI ? 2 : 0,
    trace: "on-first-retry",
    // video: 'on-first-retry',
  },
    // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run test:serve",
    port: 3000,
    timeout: 30 * 1000,
    reuseExistingServer: false,
  }
};


// const config = {
//   retries: 0,
//   timeout: 30000,
//   use: {
//     headless: true,
//     ignoreHTTPSErrors: false,
//     trace: "on",
//     video: "on",
//     baseURL: "http://localhost:8080",
//     reporter: "line",
//   },
//   /* Run your local dev server before starting the tests */
//   webServer: {
//     command: "npm run test:serve",
//     port: 8080,
//     timeout: 30 * 1000,
//     reuseExistingServer: false,
//   },
// };

// export default config;
