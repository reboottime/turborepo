// spec: apps/portal/docs/e2e-spec/login-page.md
import { test as it, expect, TEST_USER } from "../fixtures";

it.describe("Login Page", () => {
  it("Successful login redirects to Employee Management", async ({ page }) => {
    // 1. Navigate to /login
    await page.goto("/login");

    // 2. Enter email in email field (pressSequentially for webkit compatibility)
    const emailInput = page.getByLabel("Email");
    await emailInput.pressSequentially(TEST_USER.email, { delay: 10 });

    // 3. Enter password in password field
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.pressSequentially(TEST_USER.password, { delay: 10 });

    // 4. Click "Sign In" button
    const signInButton = page.getByRole("button", { name: "Sign In" });
    await expect(signInButton).toBeEnabled({ timeout: 5000 });
    await signInButton.click();

    // Expected: URL is /employees
    await expect(page).toHaveURL("/employees");
  });
});
