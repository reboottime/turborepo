// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    await page.getByLabel("Username").fill("testuser");
    await page.getByPlaceholder("Enter your password").fill("testpass");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL("/employees", { timeout: 5000 });
    await expect(
      page.getByRole("heading", { name: /employees/i }),
    ).toBeVisible();
  });

  test("should navigate to page 2 and show correct employees", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "2", exact: true }).click();

    await expect(page.getByText("Showing 6-10 of 24 employees")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Previous page" }),
    ).toBeEnabled();
  });

  test("should navigate using Next button", async ({ page }) => {
    await page.getByRole("button", { name: "Next page" }).click();

    await expect(page.getByText("Showing 6-10 of 24 employees")).toBeVisible();
  });

  test("should navigate backwards using Previous button", async ({ page }) => {
    // Go to page 3
    await page.getByRole("button", { name: "3", exact: true }).click();
    await expect(page.getByText("Showing 11-15 of 24 employees")).toBeVisible();

    // Go back to page 2
    await page.getByRole("button", { name: "Previous page" }).click();
    await expect(page.getByText("Showing 6-10 of 24 employees")).toBeVisible();
  });

  test("should jump to last page", async ({ page }) => {
    await page.getByRole("button", { name: "5", exact: true }).click();

    await expect(page.getByText("Showing 21-24 of 24 employees")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
    await expect(page.locator("table tbody tr")).toHaveCount(4);
  });

  test("should disable Previous on first page", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
  });

  test("should disable Next on last page", async ({ page }) => {
    await page.getByRole("button", { name: "5", exact: true }).click();
    await expect(page.getByText("Showing 21-24 of 24 employees")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
  });

  test("should reset pagination when search reduces results", async ({
    page,
  }) => {
    // Go to page 3
    await page.getByRole("button", { name: "3", exact: true }).click();
    await expect(page.getByText("Showing 11-15 of 24 employees")).toBeVisible();

    // Search resets to page 1
    await page.getByPlaceholder("Search by name or email...").fill("Alice");
    await expect(page.getByText("Showing 1-1 of 1 employees")).toBeVisible();

    // Clear search restores all
    await page.getByPlaceholder("Search by name or email...").clear();
    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();
  });
});
