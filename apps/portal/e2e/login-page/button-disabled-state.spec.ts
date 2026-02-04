// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Button Disabled State", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");
    const passwordField = page.getByPlaceholder("Enter your password");
    const signInButton = page.getByRole("button", { name: "Sign In" });

    // Step 3: Initially button should be disabled
    await expect(signInButton).toBeDisabled();

    // Step 4: Type username only
    await usernameField.fill("user");

    // Step 5: Button should remain disabled
    await expect(signInButton).toBeDisabled();

    // Step 6: Type password
    await passwordField.fill("pass");

    // Step 7: Button should now be enabled
    await expect(signInButton).toBeEnabled();
    await expect(signInButton).not.toHaveCSS("opacity", "0.5");

    // Step 8: Clear username
    await usernameField.clear();

    // Step 9: Button should be disabled again
    await expect(signInButton).toBeDisabled();

    // Step 10: Type username again
    await usernameField.fill("user");

    // Step 11: Button should be enabled again
    await expect(signInButton).toBeEnabled();
  });
});
