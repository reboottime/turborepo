// spec: specs/employee-page.plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from "../fixtures";

test.describe("Add Employee", () => {
  test("should open Add Employee modal", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Add Employee" }).click();

    // Verify modal structure
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("Add Employee")).toBeVisible();

    // Verify form fields
    await expect(dialog.getByLabel(/first name/i)).toBeVisible();
    await expect(dialog.getByLabel(/last name/i)).toBeVisible();
    await expect(dialog.getByLabel(/email/i)).toBeVisible();
    await expect(dialog.getByLabel(/department/i)).toBeVisible();
    await expect(dialog.getByLabel(/phone/i)).toBeVisible();

    // Save disabled initially
    await expect(
      dialog.getByRole("button", { name: "Save", exact: true }),
    ).toBeDisabled();
    await expect(dialog.getByRole("button", { name: "Cancel" })).toBeVisible();
  });

  test("should close modal when clicking Cancel", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Add Employee" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("should close modal when pressing Escape", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Add Employee" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("should successfully add a new employee with all fields", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Add Employee" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByLabel(/first name/i).fill("John");
    await dialog.getByLabel(/last name/i).fill("Doe");
    await dialog.getByLabel(/email/i).fill("john.doe@company.com");
    await dialog.getByLabel(/department/i).selectOption("Engineering");
    await dialog.getByLabel(/phone/i).fill("+1-555-9999");
    // Blur the last field to trigger validation
    await dialog.getByLabel(/first name/i).focus();

    const saveButton = dialog.getByRole("button", {
      name: "Save",
      exact: true,
    });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    // Modal closes
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // Toast appears
    await expect(page.getByText("Employee added successfully")).toBeVisible();

    // Total count increases
    await expect(page.getByText("Showing 1-5 of 25 employees")).toBeVisible();
  });

  test("should add employee without optional phone", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Add Employee" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByLabel(/first name/i).fill("Jane");
    await dialog.getByLabel(/last name/i).fill("Smith");
    await dialog.getByLabel(/email/i).fill("jane.smith@company.com");
    await dialog.getByLabel(/department/i).selectOption("Sales");
    // Blur to trigger validation on department
    await dialog.getByLabel(/first name/i).focus();

    const saveButton = dialog.getByRole("button", {
      name: "Save",
      exact: true,
    });
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.getByText("Employee added successfully")).toBeVisible();
  });

  test("should validate email format", async ({ authenticatedPage: page }) => {
    await page.getByRole("button", { name: "Add Employee" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByLabel(/first name/i).fill("Test");
    await dialog.getByLabel(/last name/i).fill("User");
    await dialog.getByLabel(/email/i).fill("notanemail");
    // Blur out of email field to trigger validation
    await dialog.getByLabel(/department/i).focus();

    await expect(dialog.getByText("Invalid email format")).toBeVisible();

    // Fix email
    await dialog.getByLabel(/email/i).fill("valid@company.com");
    await dialog.getByLabel(/department/i).focus();

    await expect(dialog.getByText("Invalid email format")).not.toBeVisible();
  });

  test("should enable Save only when all required fields valid", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Add Employee" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const saveButton = dialog.getByRole("button", {
      name: "Save",
      exact: true,
    });

    // Fill fields one by one, blurring after each to trigger validation
    await dialog.getByLabel(/first name/i).fill("John");
    await dialog.getByLabel(/last name/i).focus(); // blur firstName
    await expect(saveButton).toBeDisabled();

    await dialog.getByLabel(/last name/i).fill("Doe");
    await dialog.getByLabel(/email/i).focus(); // blur lastName
    await expect(saveButton).toBeDisabled();

    await dialog.getByLabel(/email/i).fill("john.doe@company.com");
    await dialog.getByLabel(/department/i).focus(); // blur email
    await expect(saveButton).toBeDisabled();

    await dialog.getByLabel(/department/i).selectOption("Engineering");
    await dialog.getByLabel(/first name/i).focus(); // blur department
    await expect(saveButton).toBeEnabled();
  });
});
