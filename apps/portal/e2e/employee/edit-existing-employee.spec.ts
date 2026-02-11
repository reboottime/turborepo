// spec: apps/portal/docs/e2e-spec/employee-page.md
import { test, expect, login, createEmployee } from "../fixtures";

test("Edit existing employee", async ({ page }) => {
  await login(page);

  const timestamp = Date.now();
  const firstName = `EditTest${test.info().parallelIndex}`;
  const fullName = await createEmployee(page, {
    firstName,
    lastName: `User${timestamp}`,
    email: `edit.${timestamp}@example.com`,
  });

  await page.getByRole("button", { name: `Edit ${fullName}` }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  const newLastName = `Updated${Date.now()}`;
  await page.getByLabel(/last name/i).clear();
  await page.getByLabel(/last name/i).fill(newLastName);

  await page.getByRole("button", { name: "Save Changes" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await expect(page.getByRole("status")).toContainText(
    "Employee updated successfully",
  );
  await expect(
    page.getByRole("cell", {
      name: `${firstName} ${newLastName}`,
      exact: true,
    }),
  ).toBeVisible();
});
