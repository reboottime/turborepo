// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Enter Key Submit - Successful", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");
    const passwordField = page.getByPlaceholder("Enter your password");

    // Fill in credentials
    await usernameField.fill("testuser");
    await passwordField.fill("testpass");

    // Press Enter while in password field
    await passwordField.press("Enter");

    // Verify loading state - button text changes to "Signing in..."
    const loadingButton = page.getByRole("button", { name: /signing in/i });
    await expect(loadingButton).toBeDisabled();

    // Verify fields become read-only during loading
    await expect(usernameField).toHaveAttribute("readonly");
    await expect(passwordField).toHaveAttribute("readonly");

    // Wait for redirect to employees page
    await page.waitForURL("http://localhost:3001/employees", { timeout: 3000 });

    // Verify we're on the employees page
    await expect(page).toHaveURL("http://localhost:3001/employees");
  });

  test("Enter Key Submit - With Empty Password", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");

    // Fill only username
    await usernameField.fill("testuser");

    // Press Enter while in username field (password is empty)
    await usernameField.press("Enter");

    // Since button is disabled with empty password, form shouldn't submit
    // No validation errors are shown (validation only on submit)
    await expect(page.getByText("Password is required")).not.toBeVisible();

    // Verify we're still on login page
    await expect(page).toHaveURL("http://localhost:3001/login");

    // Verify button is still disabled
    const signInButton = page.getByRole("button", { name: "Sign In" });
    await expect(signInButton).toBeDisabled();
  });
});
