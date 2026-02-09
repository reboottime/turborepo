import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: undefined,
  reporter: process.env.CI
    ? [["html", { outputFolder: "./playwright-report" }], ["github"]]
    : [["html", { outputFolder: "./playwright-report" }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: process.env.CI
    ? [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }]
    : [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
      ],
  webServer: {
    command: process.env.CI ? "pnpm start --port 3001" : "pnpm dev",
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
