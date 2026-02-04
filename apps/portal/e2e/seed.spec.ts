import { test, expect } from "@playwright/test";

test.describe("Employee Page Setup", () => {
  test("seed", async ({ page }) => {
    // Navigate to login page and authenticate
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    await page.getByLabel("Username").fill("testuser");
    await page.getByPlaceholder("Enter your password").fill("testpass");
    await page.getByRole("button", { name: "Sign In" }).click();

    // Wait for redirect to employees page
    await page.waitForURL("/employees", { timeout: 5000 });
    await expect(
      page.getByRole("heading", { name: /employees/i }),
    ).toBeVisible();
  });
});
