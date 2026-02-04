// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Username Only Submit", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");
    const passwordField = page.getByPlaceholder("Enter your password");

    // Type username only
    await usernameField.fill("testuser");

    // Verify password is empty
    await expect(passwordField).toHaveValue("");

    // Verify Sign In button is disabled (password required)
    const signInButton = page.getByRole("button", { name: "Sign In" });
    await expect(signInButton).toBeDisabled();

    // Note: Validation only triggers on submit attempt
    // Since button is disabled, no validation errors are shown
    await expect(page.getByText("Username is required")).not.toBeVisible();
    await expect(page.getByText("Password is required")).not.toBeVisible();
  });
});
