// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Form Rendering", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");

    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    // Verify logo is visible
    await expect(
      page.locator(".bg-primary").filter({ hasText: "P" }),
    ).toBeVisible();

    // Verify Username field
    const usernameField = page.getByLabel("Username");
    await expect(usernameField).toBeVisible();
    await expect(usernameField).toHaveAttribute(
      "placeholder",
      "Enter your username",
    );
    await expect(usernameField).toHaveValue("");

    // Verify Password field
    const passwordField = page.getByPlaceholder("Enter your password");
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toHaveAttribute("type", "password");
    await expect(passwordField).toHaveAttribute(
      "placeholder",
      "Enter your password",
    );
    await expect(passwordField).toHaveValue("");

    // Verify password visibility toggle button
    const toggleButton = page.getByRole("button", { name: /show password/i });
    await expect(toggleButton).toBeVisible();

    // Verify Sign In button
    const signInButton = page.getByRole("button", { name: "Sign In" });
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeDisabled();

    // Verify no error messages are shown
    await expect(page.getByText("Username is required")).not.toBeVisible();
    await expect(page.getByText("Password is required")).not.toBeVisible();
  });
});
