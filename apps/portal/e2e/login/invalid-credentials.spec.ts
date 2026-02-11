// spec: apps/portal/docs/e2e-spec/login-page.md
import { test as it, expect } from "../fixtures";

it.describe("Login Page", () => {
  it("Invalid credentials shows error", async ({ page }) => {
    // 1. Navigate to /login
    await page.goto("/login");

    // 2. Enter wrong email (pressSequentially for webkit compatibility)
    const emailInput = page.getByLabel("Email");
    await emailInput.pressSequentially("wrong@email.com", { delay: 10 });

    // 3. Enter wrong password
    const passwordInput = page.getByRole("textbox", { name: "Password" });
    await passwordInput.pressSequentially("wrongpassword", { delay: 10 });

    // 4. Click "Sign In" button
    const signInButton = page.getByRole("button", { name: "Sign In" });
    await expect(signInButton).toBeEnabled({ timeout: 5000 });
    await signInButton.click();

    // Expected: Error banner displayed (API returns "Invalid credentials")
    await expect(page.getByText("Invalid credentials")).toBeVisible();

    // Expected: user remains on /login
    await expect(page).toHaveURL("/login");
  });
});
