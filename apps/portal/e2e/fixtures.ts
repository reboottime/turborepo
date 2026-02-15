// apps/portal/e2e/fixtures.ts
import { test as base, expect, Page } from "@chromatic-com/playwright";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local if not already set
function loadEnvFile() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envPath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        const value = valueParts.join("=");
        if (key && value && !process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnvFile();

export const test = base;
export { expect };

export const TEST_USER = {
  email: process.env.E2E_TEST_EMAIL!,
  password: process.env.E2E_TEST_PASSWORD!,
};

/**
 * Login helper - navigates to login page and authenticates with TEST_USER credentials
 */
export async function login(page: Page) {
  await page.goto("/login");
  const emailInput = page.getByLabel("Email");
  const passwordInput = page.getByRole("textbox", { name: "Password" });
  const signInButton = page.getByRole("button", { name: "Sign In" });

  // Use pressSequentially for webkit compatibility with React controlled inputs
  // fill() doesn't reliably trigger React state updates in webkit
  // See: https://github.com/microsoft/playwright/issues/15813
  await emailInput.pressSequentially(TEST_USER.email, { delay: 10 });
  await passwordInput.pressSequentially(TEST_USER.password, { delay: 10 });

  // Wait for button to be enabled and click
  await expect(signInButton).toBeEnabled({ timeout: 5000 });
  await signInButton.click();

  await expect(page).toHaveURL("/employees");
}

/**
 * Creates an employee for test setup. Returns the full name.
 */
export async function createEmployee(
  page: Page,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    department?: string;
  },
): Promise<string> {
  await page.getByRole("button", { name: "Add Employee" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.getByLabel(/first name/i).fill(data.firstName);
  await page.getByLabel(/last name/i).fill(data.lastName);
  await page.getByLabel(/email/i).fill(data.email);

  const dialog = page.getByRole("dialog");
  await dialog.getByRole("combobox", { name: "Department" }).click();
  await page
    .getByRole("option", { name: data.department ?? "Engineering" })
    .click();

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("status")).toContainText(
    "Employee added successfully",
  );
  await expect(page.getByRole("status")).toBeHidden({ timeout: 5000 });

  return `${data.firstName} ${data.lastName}`;
}
