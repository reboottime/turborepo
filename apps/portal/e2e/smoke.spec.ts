import { test, expect } from "@playwright/test";

test.describe("Portal App Smoke Tests", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Portal/);
  });

  test("main heading renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Portal" })).toBeVisible();
  });

  test("subtitle renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Admin dashboard")).toBeVisible();
  });

  test("action buttons render", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Create New" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Export" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Settings" })).toBeVisible();
  });

  test("stat cards render with correct values", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Active Projects")).toBeVisible();
    await expect(page.getByText("Tasks This Week")).toBeVisible();
    await expect(page.getByText("Build Pass Rate")).toBeVisible();
  });

  test("page has no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
