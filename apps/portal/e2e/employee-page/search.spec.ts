// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
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

  test("should search employees by name", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("Alice");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(1);
    await expect(tableRows.first()).toContainText("Alice Chen");
    await expect(page.getByText("Showing 1-1 of 1 employees")).toBeVisible();
  });

  test("should search employees by email", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("bob@company.com");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(1);
    await expect(tableRows.first()).toContainText("Bob Smith");
    await expect(tableRows.first()).toContainText("bob@company.com");
  });

  test("should show partial match results (case-insensitive)", async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("chen");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(1);
    await expect(tableRows.first()).toContainText("Alice Chen");
  });

  test("should clear search and restore all employees", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("Alice");

    await expect(page.locator("table tbody tr")).toHaveCount(1);

    await searchInput.clear();

    await expect(page.locator("table tbody tr")).toHaveCount(5);
    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();
  });

  test("should display no results message", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("nonexistentname123");

    await expect(
      page.getByText(/No employees match "nonexistentname123"/),
    ).toBeVisible();
    await expect(page.getByText("Try a different search term.")).toBeVisible();
    await expect(
      page.getByText(/Showing \d+-\d+ of \d+ employees/),
    ).not.toBeVisible();
  });
});
