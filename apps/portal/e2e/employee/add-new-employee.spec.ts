// spec: apps/portal/docs/e2e-spec/employee-page.md
import { test, expect, login } from "../fixtures";

test("Add new employee", async ({ page }) => {
  await login(page);

  const timestamp = Date.now();
  const firstName = "Test";
  const lastName = `User${timestamp}`;
  const email = `test.${timestamp}@example.com`;

  await page.getByRole("button", { name: "Add Employee" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.getByLabel(/first name/i).fill(firstName);
  await page.getByLabel(/last name/i).fill(lastName);
  await page.getByLabel(/email/i).fill(email);

  const dialog = page.getByRole("dialog");
  await dialog.getByRole("combobox", { name: "Department" }).click();
  await page.getByRole("option", { name: "Engineering" }).click();

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await expect(page.getByRole("status")).toContainText(
    "Employee added successfully",
  );
  await expect(
    page.getByRole("cell", { name: `${firstName} ${lastName}`, exact: true }),
  ).toBeVisible();
});
