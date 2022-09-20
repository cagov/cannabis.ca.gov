const config = {
  retries: 0,
  timeout: 30000,
  use: {
    headless: true,
    ignoreHTTPSErrors: false,
    trace: "on",
    video: "on",
    baseURL: "http://127.0.0.1:8080",
    reporter: "line",
  },
};

export default config;
