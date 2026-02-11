// spec: apps/portal/docs/e2e-spec/login-page.md
import { test as it, expect, login } from "../fixtures";

it.describe("Login Page", () => {
  it("Session persists after page reload", async ({ page }) => {
    // 1. Complete login flow
    await login(page);

    // 2. Reload the page
    await page.reload();

    // Expected: Still on /employees, not redirected to /login
    await expect(page).toHaveURL("/employees");
  });
});
