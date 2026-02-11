// spec: apps/portal/docs/e2e-spec/employee-page.md
import { test, expect, login, createEmployee } from "../fixtures";

test("Delete employee", async ({ page }) => {
  await login(page);

  const timestamp = Date.now();
  const fullName = await createEmployee(page, {
    firstName: `DeleteTest${test.info().parallelIndex}`,
    lastName: `User${timestamp}`,
    email: `delete.${timestamp}@example.com`,
    department: "Sales",
  });

  await page.getByRole("button", { name: `Delete ${fullName}` }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Delete" })
    .click();
  await expect(page.getByRole("dialog")).toBeHidden();

  await expect(page.getByRole("status")).toContainText(
    "Employee deleted successfully",
  );
  await expect(
    page.getByRole("cell", { name: fullName, exact: true }),
  ).toBeHidden();
});
