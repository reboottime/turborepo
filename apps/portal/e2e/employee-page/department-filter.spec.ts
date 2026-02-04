// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "../fixtures";

test.describe("Department Filter", () => {
  test("should filter employees by Engineering department", async ({
    authenticatedPage: page,
  }) => {
    // Engineering has 7 employees: Alice, David, Henry, Karen, Olivia, Sam, Wendy
    await page.locator("select").selectOption("Engineering");

    // First page shows 5 of 7
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(5);
    await expect(page.getByText("Showing 1-5 of 7 employees")).toBeVisible();

    // All visible rows should show Engineering
    for (let i = 0; i < 5; i++) {
      await expect(tableRows.nth(i)).toContainText("Engineering");
    }
  });

  test("should filter employees by Sales department", async ({
    authenticatedPage: page,
  }) => {
    // Sales has 4: Bob, Iris, Peter, Victor
    await page.locator("select").selectOption("Sales");

    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(4);
    await expect(page.getByText("Showing 1-4 of 4 employees")).toBeVisible();

    // Prev and Next should be disabled (single page)
    await expect(
      page.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
  });

  test("should reset to all departments", async ({
    authenticatedPage: page,
  }) => {
    await page.locator("select").selectOption("Sales");
    await expect(page.getByText("Showing 1-4 of 4 employees")).toBeVisible();

    await page.locator("select").selectOption("all");

    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();
    await expect(page.locator("table tbody tr")).toHaveCount(5);
  });

  test("should combine department filter with search", async ({
    authenticatedPage: page,
  }) => {
    await page.locator("select").selectOption("Engineering");
    await expect(page.getByText("Showing 1-5 of 7 employees")).toBeVisible();

    const searchInput = page.getByPlaceholder("Search by name or email...");
    await searchInput.fill("David");

    // Only David Park (Engineering) should appear
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(1);
    await expect(tableRows.first()).toContainText("David Park");

    // Switch to Sales — David is not in Sales
    await page.locator("select").selectOption("Sales");
    await expect(page.getByText(/No employees match "David"/)).toBeVisible();

    // Search term persists
    await expect(searchInput).toHaveValue("David");
  });
});
