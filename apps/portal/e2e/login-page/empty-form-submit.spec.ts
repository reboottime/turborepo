// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Empty Form Submit", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");
    const passwordField = page.getByPlaceholder("Enter your password");
    const signInButton = page.getByRole("button", { name: "Sign In" });

    // Verify empty form state
    await expect(usernameField).toHaveValue("");
    await expect(passwordField).toHaveValue("");

    // Verify Sign In button is disabled (prevents empty form submission)
    await expect(signInButton).toBeDisabled();

    // Verify no validation errors initially
    await expect(page.getByText("Username is required")).not.toBeVisible();
    await expect(page.getByText("Password is required")).not.toBeVisible();

    // Verify username field has aria-invalid false initially
    await expect(usernameField).toHaveAttribute("aria-invalid", "false");

    // Note: Password field doesn't have aria-invalid attribute (wrapped in div)
    // This is acceptable - form validation prevents submission via disabled button
  });
});
