import { test, expect } from "@playwright/test";
import { login } from "./fixtures";

test.describe("Authentication Flow", () => {
  test("redirects unauthenticated user from root to login", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/login");
  });

  test("redirects unauthenticated user from protected route to login", async ({
    page,
  }) => {
    await page.goto("/employees");
    await expect(page).toHaveURL("/login");
  });

  test("allows authenticated user to access protected routes", async ({
    page,
  }) => {
    await login(page);

    // Should see employees page content
    await expect(
      page.getByRole("heading", { name: "Employees" }),
    ).toBeVisible();

    // Should see navigation header
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();
  });

  test("redirects authenticated user from login to app", async ({ page }) => {
    await login(page);

    // Try to visit login page
    await page.goto("/login");

    // Should redirect to app
    await expect(page).toHaveURL("/employees");
  });

  test("redirects authenticated user from root to app", async ({ page }) => {
    await login(page);

    // Try to visit root
    await page.goto("/");

    // Should redirect to app
    await expect(page).toHaveURL("/employees");
  });

  test("sign out clears auth and redirects to login", async ({ page }) => {
    await login(page);

    // Click sign out
    await page.getByRole("button", { name: /sign out/i }).click();

    // Should redirect to login
    await expect(page).toHaveURL("/login");

    // Trying to access protected route should redirect back to login
    await page.goto("/employees");
    await expect(page).toHaveURL("/login");
  });

  test("auth persists across page reloads", async ({ page }) => {
    await login(page);

    // Reload page
    await page.reload();

    // Should still be on employees page (not redirected to login)
    await expect(page).toHaveURL("/employees");
    await expect(
      page.getByRole("heading", { name: "Employees" }),
    ).toBeVisible();
  });
});
