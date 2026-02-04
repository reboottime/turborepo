// spec: specs/login-page.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("Successful Login", async ({ page }) => {
    // Navigate to login page
    await page.goto("http://localhost:3001/login");
    await page.waitForLoadState("networkidle");

    const usernameField = page.getByLabel("Username");
    const passwordField = page.getByPlaceholder("Enter your password");
    const signInButton = page.getByRole("button", { name: "Sign In" });

    // Fill in credentials
    await usernameField.fill("testuser");
    await passwordField.fill("testpass");

    // Click Sign In button
    await signInButton.click();

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

    // Verify employees page content is visible
    await expect(
      page.getByRole("heading", { name: /employees/i }),
    ).toBeVisible();

    // Verify Sign Out button is visible
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();

    // Verify auth cookie is set
    const cookies = await page.context().cookies();
    const authCookie = cookies.find((c) => c.name === "portal_auth");
    expect(authCookie).toBeDefined();
    expect(authCookie?.value).toBe("authenticated");
  });
});
