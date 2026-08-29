import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "ACCESS_CODE=playwright-code PLAYWRIGHT=true bun run dev",
    reuseExistingServer: false,
    url: "http://127.0.0.1:3000",
  },
});
