// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "../fixtures";

test.describe("Delete Employee", () => {
  test("should open delete confirmation dialog", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Delete Alice Chen" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Delete Employee")).toBeVisible();
    await expect(
      dialog.getByText(/Are you sure you want to delete/),
    ).toBeVisible();
    await expect(dialog.getByText("Alice Chen")).toBeVisible();
    await expect(
      dialog.getByText("This action cannot be undone."),
    ).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Cancel" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Delete" })).toBeVisible();
  });

  test("should cancel delete operation", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Delete Alice Chen" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.locator("table")).toContainText("Alice Chen");
    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();
  });

  test("should successfully delete an employee", async ({
    authenticatedPage: page,
  }) => {
    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();

    await page.getByRole("button", { name: "Delete Alice Chen" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Click Delete in the dialog (not the table row button)
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Delete" })
      .click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByText("Employee deleted successfully")).toBeVisible();
    await expect(page.locator("table")).not.toContainText("Alice Chen");
    await expect(page.getByText("Showing 1-5 of 23 employees")).toBeVisible();
  });

  test("should close dialog with Escape key", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Delete Bob Smith" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.locator("table")).toContainText("Bob Smith");
    await expect(page.getByText("Showing 1-5 of 24 employees")).toBeVisible();
  });
});
