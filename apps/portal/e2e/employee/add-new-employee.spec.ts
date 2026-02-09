// spec: apps/portal/docs/e2e-spec/employee-page.md
import { test as it, expect, login } from "../fixtures";

it.describe("Employee Page", () => {
  it("Add new employee", async ({ page }) => {
    // Setup: Authenticated user on /employees
    await login(page);

    // Generate unique test data
    const timestamp = Date.now();
    const uniqueFirstName = `Test`;
    const uniqueLastName = `User${timestamp}`;
    const uniqueEmail = `test.${timestamp}@example.com`;

    // 1. Click "Add Employee" button
    await page.getByRole("button", { name: "Add Employee" }).click();

    // Wait for modal visible
    await expect(page.getByRole("dialog")).toBeVisible();

    // 2. Fill name fields with unique test name
    await page.getByLabel(/first name/i).fill(uniqueFirstName);
    await page.getByLabel(/last name/i).fill(uniqueLastName);

    // 3. Fill email field with unique email
    await page.getByLabel(/email/i).fill(uniqueEmail);

    // 4. Select department from dropdown
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("combobox", { name: "Department" }).click();
    await page.getByRole("option", { name: "Engineering" }).click();

    // 5. Click "Save" button
    await page.getByRole("button", { name: "Save" }).click();

    // Wait for modal to close
    await expect(page.getByRole("dialog")).toBeHidden();

    // Expected: Success toast displayed, new employee appears in table
    await expect(page.getByRole("status")).toContainText(
      "Employee added successfully",
    );
    const fullName = `${uniqueFirstName} ${uniqueLastName}`;
    await expect(
      page.getByRole("cell", { name: fullName, exact: true }),
    ).toBeVisible();
  });
});
