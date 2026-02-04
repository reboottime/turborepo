// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "../fixtures";

test.describe("Search Functionality", () => {
  test("should search employees by name", async ({
    authenticatedPage: page,
  }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("Alice");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(1);
    await expect(tableRows.first()).toContainText("Alice Chen");
    await expect(page.getByText("Showing 1-1 of 1 employees")).toBeVisible();
  });

  test("should search employees by email", async ({
    authenticatedPage: page,
  }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("bob@company.com");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(1);
    await expect(tableRows.first()).toContainText("Bob Smith");
    await expect(tableRows.first()).toContainText("bob@company.com");
  });

  test("should show partial match results (case-insensitive)", async ({
    authenticatedPage: page,
  }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("chen");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(1);
    await expect(tableRows.first()).toContainText("Alice Chen");
  });

  test("should clear search and restore all employees", async ({
    authenticatedPage: page,
  }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("Alice");

    await expect(page.locator("table tbody tr")).toHaveCount(1);

    await searchInput.clear();

    await expect(page.locator("table tbody tr")).toHaveCount(5);
    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();
  });

  test("should display no results message", async ({
    authenticatedPage: page,
  }) => {
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
