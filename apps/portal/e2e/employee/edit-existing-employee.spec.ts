// spec: apps/portal/docs/e2e-spec/employee-page.md
import { test as it, expect, login } from "../fixtures";

it.describe("Employee Page", () => {
  it("Edit existing employee", async ({ page }) => {
    // Setup: Authenticated user on /employees with at least one employee in table
    await login(page);

    // First create an employee to edit (ensures test isolation)
    const timestamp = Date.now();
    const parallelIndex = it.info().parallelIndex;
    const testFirstName = `EditTest${parallelIndex}`;
    const testLastName = `User${timestamp}`;

    // Create the employee
    await page.getByRole("button", { name: "Add Employee" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByLabel(/first name/i).fill(testFirstName);
    await page.getByLabel(/last name/i).fill(testLastName);
    await page.getByLabel(/email/i).fill(`edit.test.${timestamp}@example.com`);
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("combobox", { name: "Department" }).click();
    await page.getByRole("option", { name: "Engineering" }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.getByRole("status")).toContainText(
      "Employee added successfully",
    );

    // Wait for toast to disappear before continuing
    await expect(page.getByRole("status")).toBeHidden({ timeout: 5000 });

    // 2. Click edit icon on that employee
    await page
      .getByRole("button", { name: `Edit ${testFirstName} ${testLastName}` })
      .click();

    // Wait for modal visible with pre-filled data
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(
      page.getByRole("dialog").getByText("Edit Employee"),
    ).toBeVisible();

    // 3. Change last name field to new value
    const newLastName = `Updated${timestamp}`;
    await page.getByLabel(/last name/i).clear();
    await page.getByLabel(/last name/i).fill(newLastName);

    // 4. Click "Save Changes" button
    await page.getByRole("button", { name: "Save Changes" }).click();

    // Wait for modal to close
    await expect(page.getByRole("dialog")).toBeHidden();

    // Expected: Success toast displayed, updated name visible in table row
    await expect(page.getByRole("status")).toContainText(
      "Employee updated successfully",
    );
    const updatedFullName = `${testFirstName} ${newLastName}`;
    await expect(
      page.getByRole("cell", { name: updatedFullName, exact: true }),
    ).toBeVisible();
  });
});
