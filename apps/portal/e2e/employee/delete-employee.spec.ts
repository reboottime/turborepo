// spec: apps/portal/docs/e2e-spec/employee-page.md
import { test as it, expect, login } from "../fixtures";

it.describe("Employee Page", () => {
  it("Delete employee", async ({ page }) => {
    // Setup: Authenticated user on /employees with at least one employee in table
    await login(page);

    // First create an employee to delete (ensures test isolation)
    const timestamp = Date.now();
    const parallelIndex = it.info().parallelIndex;
    const testFirstName = `DeleteTest${parallelIndex}`;
    const testLastName = `User${timestamp}`;

    // Create the employee
    await page.getByRole("button", { name: "Add Employee" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByLabel(/first name/i).fill(testFirstName);
    await page.getByLabel(/last name/i).fill(testLastName);
    await page
      .getByLabel(/email/i)
      .fill(`delete.test.${timestamp}@example.com`);
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("combobox", { name: "Department" }).click();
    await page.getByRole("option", { name: "Sales" }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.getByRole("status")).toContainText(
      "Employee added successfully",
    );

    // Wait for toast to disappear before continuing
    await expect(page.getByRole("status")).toBeHidden({ timeout: 5000 });

    const employeeFullName = `${testFirstName} ${testLastName}`;

    // 2. Click delete icon on that employee
    await page
      .getByRole("button", { name: `Delete ${testFirstName} ${testLastName}` })
      .click();

    // Wait for confirmation dialog visible
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("dialog").getByText("Delete Employee"),
    ).toBeVisible();

    // 3. Click "Delete" button to confirm
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Delete" })
      .click();

    // Wait for dialog to close
    await expect(page.getByRole("dialog")).toBeHidden();

    // Expected: Success toast displayed, employee no longer in table
    await expect(page.getByRole("status")).toContainText(
      "Employee deleted successfully",
    );

    // Verify the deleted employee is no longer visible
    await expect(
      page.getByRole("cell", { name: employeeFullName, exact: true }),
    ).toBeHidden();
  });
});
