import { test, expect } from "@playwright/test";

test.describe("Web App Smoke Tests", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Web/);
  });

  test("main heading renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Web App" })).toBeVisible();
  });

  test("subtitle renders", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Turborepo monorepo demo")
    ).toBeVisible();
  });

  test("Button variants render", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Button" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Outline" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Ghost" })).toBeVisible();
  });

  test("Card components render", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Shared Components" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Turborepo Caching" })
    ).toBeVisible();
  });

  test("math utilities display correct values", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("add(2, 3)")).toBeVisible();
    await expect(page.getByText("5", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("multiply(4, 5)")).toBeVisible();
    await expect(page.getByText("20", { exact: true })).toBeVisible();
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
