// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "../fixtures";

test.describe("Edit Employee", () => {
  test("should open Edit Employee modal with pre-populated data", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Edit Alice Chen" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Edit Employee")).toBeVisible();

    // Verify pre-populated fields
    await expect(dialog.getByLabel(/first name/i)).toHaveValue("Alice");
    await expect(dialog.getByLabel(/last name/i)).toHaveValue("Chen");
    await expect(dialog.getByLabel(/email/i)).toHaveValue("alice@company.com");
    await expect(dialog.getByLabel(/department/i)).toHaveValue("Engineering");
    await expect(dialog.getByLabel(/phone/i)).toHaveValue("+1-555-0101");

    // Save Changes button is enabled
    await expect(
      dialog.getByRole("button", { name: "Save Changes" }),
    ).toBeEnabled();
  });

  test("should close edit modal without saving changes", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Edit Alice Chen" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Modify data
    await dialog.getByLabel(/first name/i).fill("Modified");

    // Cancel
    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Original data unchanged in table
    await expect(page.locator("table")).toContainText("Alice Chen");
  });

  test("should successfully update employee information", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Edit Bob Smith" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Change first name
    await dialog.getByLabel(/first name/i).fill("Robert");

    // Change department
    await dialog.getByLabel(/department/i).selectOption("Marketing");
    // Blur to trigger validation
    await dialog.getByLabel(/first name/i).focus();

    await page.getByRole("button", { name: "Save Changes" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByText("Employee updated successfully")).toBeVisible();

    // Verify updated data in table
    await expect(page.locator("table")).toContainText("Robert Smith");
    await expect(page.locator("table")).toContainText("Marketing");
  });

  test("should validate email format in edit mode", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Edit Alice Chen" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByLabel(/email/i).fill("invalidemail");
    await dialog.getByLabel(/phone/i).focus(); // blur to trigger validation

    await expect(dialog.getByText("Invalid email format")).toBeVisible();

    await dialog.getByLabel(/email/i).fill("alice.updated@company.com");
    await dialog.getByLabel(/phone/i).focus(); // blur

    await expect(dialog.getByText("Invalid email format")).not.toBeVisible();
  });

  test("should not allow empty required fields in edit mode", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Edit Alice Chen" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // Clear first name and blur to trigger required validation
    await dialog.getByLabel(/first name/i).fill("");
    await dialog.getByLabel(/last name/i).focus();

    await expect(dialog.getByText("First name is required")).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: "Save Changes" }),
    ).toBeDisabled();
  });
});
