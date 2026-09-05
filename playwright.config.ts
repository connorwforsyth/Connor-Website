import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  testDir: "./tests",
  use: {
    baseURL: externalBaseUrl ?? "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  webServer: externalBaseUrl
    ? undefined
    : {
        command:
          "ACCESS_CODE=playwright-code SESSION_ENV=playwright-session PLAYWRIGHT=true bun run dev",
        reuseExistingServer: false,
        url: "http://127.0.0.1:3000",
      },
});
