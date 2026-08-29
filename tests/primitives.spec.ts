import { expect, test } from "@playwright/test";

test("Base UI primitives support keyboard and focus interactions", async ({
  page,
}) => {
  await page.goto("/migration-fixture");

  const select = page.getByRole("combobox", { name: "Theme" }).first();
  await select.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("option", { name: "Light" })).toBeVisible();
  await page.getByRole("option", { name: "Dark" }).click();
  await expect(select).toContainText("dark");

  const menuTrigger = page.getByRole("button", { name: "Options" });
  await menuTrigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("menuitem", { name: "Archive" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menuTrigger).toBeFocused();

  const tooltipTrigger = page.getByRole("button", { name: "Hover for help" });
  await tooltipTrigger.hover();
  await expect(page.getByText("Helpful information")).toBeVisible();
});

test("access form reports invalid and accepts valid access codes", async ({
  page,
}) => {
  await page.goto("/migration-fixture");

  const accessCode = page.getByLabel("Access Code");
  await accessCode.fill("incorrect");
  await page.getByRole("button", { exact: true, name: "Next" }).click();
  await expect(page.locator("#access-code-error")).toContainText(
    "Wrong access code."
  );

  await accessCode.fill("playwright-code");
  await page.getByRole("button", { exact: true, name: "Next" }).click();
  await expect(page.getByLabel("Your Name")).toBeVisible({ timeout: 4000 });
});

test("access form automatically submits a URL access code", async ({
  page,
}) => {
  await page.goto("/migration-fixture?code=playwright-code");
  await expect(page.getByLabel("Your Name")).toBeVisible({ timeout: 4000 });
});
