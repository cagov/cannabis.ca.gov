const config = {
  fullyParallel: true,
  retries: 0,
  timeout: 60000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: "on",
    video: "on",
    baseURL: "http://localhost:8080/",
    reporter: "line"
  },
  webServer: {
    command: "npm run test:serve",
    port: 8080,
    timeout: 12 * 1000,
    reuseExistingServer: false
  }
};

export default config;
