// spec: apps/portal/docs/e2e-spec/login-page.md
import { test as it, expect } from "../fixtures";

it.describe("Login Page", () => {
  it("Empty form submission is prevented", async ({ page }) => {
    // 1. Navigate to /login
    await page.goto("/login");

    // 2. Verify Sign In button is disabled with empty fields
    const signInButton = page.getByRole("button", { name: "Sign In" });
    await expect(signInButton).toBeDisabled();

    // 3. Enter only email, verify still disabled
    const emailInput = page.getByLabel("Email");
    await emailInput.pressSequentially("test@email.com", { delay: 10 });
    await expect(signInButton).toBeDisabled();

    // 4. Clear email, enter only password, verify still disabled
    await emailInput.clear();
    const passwordInput = page.getByRole("textbox", { name: "Password" });
    await passwordInput.pressSequentially("somepassword", { delay: 10 });
    await expect(signInButton).toBeDisabled();

    // 5. Enter both fields, verify button becomes enabled
    await emailInput.pressSequentially("test@email.com", { delay: 10 });
    await expect(signInButton).toBeEnabled();

    // Expected: User remains on /login throughout
    await expect(page).toHaveURL("/login");
  });
});
