import { test as base, expect, type Page } from "@playwright/test";

export { expect };

export async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Username").fill("testuser");
  await page.getByPlaceholder("Enter your password").fill("testpass");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL("/employees", { timeout: 5000 });
}

export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    await login(page);
    await expect(
      page.getByRole("heading", { name: /employees/i }),
    ).toBeVisible();
    // eslint-disable-next-line react-hooks/rules-of-hooks -- Playwright fixture API
    await use(page);
  },
});
