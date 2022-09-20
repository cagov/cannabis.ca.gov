const config = {
  retries: 0,
  timeout: 30000,
  use: {
    headless: true,
    ignoreHTTPSErrors: false,
    baseURL: "http://127.0.0.1:8080",
  },
};

export default config;
