// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Password Only Submit", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");
    const passwordField = page.getByPlaceholder("Enter your password");

    // Type password only
    await passwordField.fill("testpass");

    // Verify username is empty
    await expect(usernameField).toHaveValue("");

    // Verify Sign In button is disabled (username required)
    const signInButton = page.getByRole("button", { name: "Sign In" });
    await expect(signInButton).toBeDisabled();

    // Note: Validation only triggers on submit attempt
    // Since button is disabled, no validation errors are shown
    await expect(page.getByText("Username is required")).not.toBeVisible();
    await expect(page.getByText("Password is required")).not.toBeVisible();
  });
});
