import { expect, test } from "@playwright/test";

const PROTECTED = "/projects/chatbot-heuristic";

test("wrong code does not grant access", async ({ page }) => {
  await page.goto(PROTECTED);
  await page.getByLabel("Access Code").fill("definitely-wrong");
  await page.getByRole("button", { exact: true, name: "Next" }).click();
  await page.waitForTimeout(3000);
  // Should still be on the password step, not advanced to "name"
  await expect(page.getByLabel("Your Name")).toHaveCount(0);
  await expect(page.getByText(/access code/i).first()).toBeVisible();
});

test("wrong code via ?code= url does not grant access", async ({ page }) => {
  await page.goto(`${PROTECTED}?code=definitely-wrong`);
  await page.waitForTimeout(3000);
  await expect(page.getByLabel("Your Name")).toHaveCount(0);
});

test("correct code advances past password step", async ({ page }) => {
  await page.goto(PROTECTED);
  await page.getByLabel("Access Code").fill("playwright-code");
  await page.getByRole("button", { exact: true, name: "Next" }).click();
  await expect(page.getByLabel("Your Name")).toBeVisible({ timeout: 5000 });
});

test("wrong code then double-submit race does not leak content", async ({
  page,
}) => {
  await page.goto(PROTECTED);
  const input = page.getByLabel("Access Code");
  const submit = page.getByRole("button", { exact: true, name: "Next" });

  await input.fill("playwright-code");
  await submit.click();
  // Immediately swap to a wrong code and submit again during the success delay
  await input.fill("wrong-now");
  await submit.click({ trial: false }).catch(() => {
    // A concurrent click may be intercepted mid-animation; that's fine.
  });
  await page.waitForTimeout(4000);

  // Even if it advanced, the protected MDX heading must never render
  await expect(page.getByRole("heading", { name: /our process/i })).toHaveCount(
    0
  );
});
