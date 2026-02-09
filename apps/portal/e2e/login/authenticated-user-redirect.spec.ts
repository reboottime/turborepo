// spec: apps/portal/docs/e2e-spec/login-page.md
import { test as it, expect, login } from "../fixtures";

it.describe("Login Page", () => {
  it("Authenticated user redirected away from login", async ({ page }) => {
    // 1. Complete login flow
    await login(page);

    // 2. Navigate directly to /login
    await page.goto("/login");

    // Expected: Automatically redirected to /employees, login form never displayed
    await expect(page).toHaveURL("/employees");
    await expect(page.getByLabel("Email")).not.toBeVisible();
  });
});
