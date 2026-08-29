import { expect, test } from "@playwright/test";

test("back from a project goes to the projects list", async ({ page }) => {
  await page.goto("/projects");
  await page
    .getByRole("link", { name: /archive/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/projects\/[^/]+$/);

  await page.getByRole("link", { exact: true, name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects\/?$/);
  await expect(
    page.getByRole("heading", { name: /projects and case studies/i })
  ).toBeVisible();
});

test("back from a writing post goes to the writing list", async ({ page }) => {
  await page.goto("/writing");
  await page.locator("ol a").first().click();
  await expect(page).toHaveURL(/\/writing\/[^/]+$/);

  await page.getByRole("link", { exact: true, name: "Writing" }).click();
  await expect(page).toHaveURL(/\/writing\/?$/);
});

test("back from the lists goes to the index", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("link", { exact: true, name: "Index" }).click();
  await expect(page).toHaveURL(/127\.0\.0\.1:\d+\/?$/);
});
