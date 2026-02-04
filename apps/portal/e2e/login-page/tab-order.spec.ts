// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Tab Order", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");
    const passwordField = page.getByPlaceholder("Enter your password");
    const toggleButton = page.getByRole("button", { name: /show password/i });

    // Press Tab to focus first element
    await page.keyboard.press("Tab");

    // Verify focus is on Username field
    await expect(usernameField).toBeFocused();

    // Press Tab again
    await page.keyboard.press("Tab");

    // Verify focus is on Password field
    await expect(passwordField).toBeFocused();

    // Press Tab again
    await page.keyboard.press("Tab");

    // Verify focus is on Password visibility toggle button
    await expect(toggleButton).toBeFocused();

    // Note: Sign In button is disabled when fields are empty
    // Disabled buttons with pointer-events-none cannot receive focus
    // This is correct accessibility behavior
    // Instead, verify reverse tab order from toggle button

    // Test reverse tab order with Shift+Tab
    await page.keyboard.press("Shift+Tab");
    await expect(passwordField).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(usernameField).toBeFocused();
  });
});
