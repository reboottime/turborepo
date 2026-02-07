// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "../fixtures";

test.describe("Table Rendering", () => {
  test("should display the employee table with correct structure", async ({
    authenticatedPage: page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /employees/i }),
    ).toBeVisible();

    // Verify table column headers
    await expect(page.getByRole("columnheader", { name: "#" })).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Name" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Email" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Dept" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Actions" }),
    ).toBeVisible();

    // Verify 5 rows on first page
    const tableRows = page.locator("table tbody tr");
    await expect(tableRows).toHaveCount(5);

    // Verify first row data
    const firstRow = tableRows.first();
    await expect(firstRow).toContainText("Alice Chen");
    await expect(firstRow).toContainText("alice@company.com");
    await expect(firstRow).toContainText("Engineering");

    // Verify each row has Edit and Delete action buttons
    for (let i = 0; i < 5; i++) {
      const row = tableRows.nth(i);
      await expect(row.getByRole("button", { name: /edit/i })).toBeVisible();
      await expect(row.getByRole("button", { name: /delete/i })).toBeVisible();
    }
  });

  test("should display correct employee count and pagination info", async ({
    authenticatedPage: page,
  }) => {
    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();

    const previousButton = page.getByRole("button", { name: "Previous page" });
    await expect(previousButton).toBeDisabled();

    const nextButton = page.getByRole("button", { name: "Next page" });
    await expect(nextButton).toBeEnabled();

    // Verify page number buttons
    await expect(
      page.getByRole("button", { name: "1", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "2", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "5", exact: true }),
    ).toBeVisible();
  });

  test("should display the search and filter controls", async ({
    authenticatedPage: page,
  }) => {
    const searchInput = page.getByPlaceholder("Search by name or email...");
    await expect(searchInput).toBeVisible();

    // Verify department dropdown with default value
    const departmentDropdown = page.getByLabel(/filter by department/i);
    await expect(departmentDropdown).toBeVisible();
    await expect(departmentDropdown).toContainText("All Departments");

    // Verify 'Add Employee' button
    const addButton = page.getByRole("button", { name: "Add Employee" });
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();
  });
});
