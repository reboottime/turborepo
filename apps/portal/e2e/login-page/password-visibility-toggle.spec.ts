// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Password Visibility Toggle", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const passwordField = page.getByPlaceholder("Enter your password");
    const toggleButton = page.getByRole("button", { name: /show password/i });

    // Type password
    await passwordField.fill("mypassword");

    // Verify initial state - password is masked
    await expect(passwordField).toHaveAttribute("type", "password");
    await expect(toggleButton).toHaveAttribute("aria-label", "Show password");

    // Click toggle button to show password
    await toggleButton.click();

    // Verify password is now visible
    await expect(passwordField).toHaveAttribute("type", "text");
    await expect(passwordField).toHaveValue("mypassword");
    const hideButton = page.getByRole("button", { name: /hide password/i });
    await expect(hideButton).toHaveAttribute("aria-label", "Hide password");

    // Click toggle button again to hide password
    await hideButton.click();

    // Verify password is masked again
    await expect(passwordField).toHaveAttribute("type", "password");
    await expect(toggleButton).toHaveAttribute("aria-label", "Show password");

    // Verify the value is still there but masked
    await expect(passwordField).toHaveValue("mypassword");
  });
});
