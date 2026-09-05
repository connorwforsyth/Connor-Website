import { expect, test } from "@playwright/test";

test("CV stays selectable HTML while the paper lands, then becomes idle", async ({
  page,
}) => {
  await page.setViewportSize({ height: 1000, width: 1440 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  // The landing lasts well under two seconds and a production build can finish
  // it before any polled assertion runs, so record the animations as they are
  // created instead of trying to observe them mid-flight.
  await page.addInitScript(() => {
    const original = Element.prototype.animate;
    (window as unknown as { landingAnimations: number }).landingAnimations = 0;
    Element.prototype.animate = function animate(
      ...args: Parameters<typeof original>
    ) {
      (window as unknown as { landingAnimations: number }).landingAnimations +=
        1;
      return original.apply(this, args);
    };
  });
  await page.goto("/cv");
  const document = page.getByRole("main");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { landingAnimations: number }).landingAnimations
      )
    )
    .toBeGreaterThan(0);
  await page.screenshot({ path: ".context/cv-desktop-landing.png" });
  await expect(
    document.getByRole("heading", { exact: true, name: "Connor Forsyth" })
  ).toHaveCount(1);
  await expect(document.locator("canvas")).toHaveCount(0);
  await expect
    .poll(() =>
      document.evaluate(
        (element) => element.getAnimations({ subtree: true }).length
      )
    )
    .toBe(0);
  await expect(document.locator(".page").first()).toHaveCSS(
    "transform",
    "none"
  );
  const selected = await document
    .getByRole("heading", { exact: true, name: "Connor Forsyth" })
    .evaluate((heading) => {
      const selection = window.getSelection();
      const range = window.document.createRange();
      range.selectNodeContents(heading);
      selection?.removeAllRanges();
      selection?.addRange(range);
      const text = selection?.toString();
      selection?.removeAllRanges();
      return text;
    });
  expect(selected).toBe("Connor Forsyth");
  await page.screenshot({ fullPage: true, path: ".context/cv-desktop.png" });
  await page.keyboard.press("End");
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
  await expect(
    document.getByText("Building a timezone picker tool", { exact: false })
  ).toBeInViewport();
  await page.keyboard.press("Home");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  expect(errors).toEqual([]);
});

test("second sheet stays hidden during its delay and fades without flashing", async ({
  page,
}) => {
  await page.setViewportSize({ height: 1000, width: 1440 });
  await page.goto("/cv");
  await page.waitForFunction(() => {
    const animations = document.querySelector("main")?.getAnimations({
      subtree: true,
    });
    if (animations?.length !== 2) {
      return false;
    }
    for (const animation of animations) {
      animation.pause();
    }
    return true;
  });
  const sheet = page.locator(".page").nth(1);
  expect(await sheet.evaluate((element) => element.style.opacity)).toBe("0");
  const samples = await sheet.evaluate((element) => {
    // Even stale settled styles must not show through the animation's delay.
    element.style.opacity = "1";
    const [animation] = element.getAnimations();
    const { effect } = animation;
    if (!effect) {
      throw new Error("Missing second-sheet landing effect");
    }
    const { delay } = effect.getTiming();
    return [0, delay / 2, delay, delay + 60, delay + 300, delay + 700].map(
      (time) => {
        animation.currentTime = time;
        const style = getComputedStyle(element);
        return { opacity: Number(style.opacity), transform: style.transform };
      }
    );
  });
  expect(samples[0].opacity).toBe(0);
  expect(samples[1].opacity).toBe(0);
  expect(samples[0].transform).not.toBe("none");
  expect(samples[3].transform).not.toBe(samples[2].transform);
  expect(samples[4].opacity).toBeGreaterThan(0);
  expect(samples[4].opacity).toBeLessThan(1);
  expect(samples[5].opacity).toBe(1);
  expect(samples.map(({ opacity }) => opacity)).toEqual(
    samples.map(({ opacity }) => opacity).toSorted((a, b) => a - b)
  );
});

for (const width of [320, 390, 768, 820, 1440]) {
  test(`CV fits ${width}px with no clipped text`, async ({ page }) => {
    await page.setViewportSize({ height: 844, width });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/cv");
    await page.evaluate(() => document.fonts.ready);
    const contacts = page.locator("address");
    await expect(contacts.getByRole("link")).toHaveText(
      [
        "c@connorforsyth.co",
        /^connorforsyth\.co\/portfolio(?:\?code=.+)?$/,
        "@connorwforsyth",
        "@connorwforsyth",
        "+61 400 891 285",
      ],
      { useInnerText: true }
    );
    await expect(contacts.locator(":scope > ul")).toHaveCount(2);
    await expect(contacts.locator("svg").first()).toHaveCSS(
      "color",
      "rgb(10, 55, 205)"
    );
    await expect(
      contacts.getByRole("link", { name: /^connorforsyth\.co\/portfolio/ })
    ).toHaveAttribute(
      "href",
      /^https:\/\/connorforsyth\.co\/portfolio(?:\?code=.+)?$/
    );
    expect((await contacts.boundingBox())?.height).toBeLessThan(140);
    const overflows = await page
      .locator("main, main *")
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 &&
              (rect.right > window.innerWidth + 1 || rect.left < -1)
            );
          })
          .map((element) => element.tagName)
      );
    expect(overflows).toEqual([]);
    expect(
      await page
        .locator(".page")
        .evaluateAll((elements) =>
          elements.every(
            (element) => element.scrollHeight <= element.clientHeight + 1
          )
        )
    ).toBe(true);
    await expect(
      page.getByRole("link", { name: "Download CV as PDF" })
    ).toBeVisible();
    await page.screenshot({ fullPage: true, path: `.context/cv-${width}.png` });
    await page
      .locator("header")
      .screenshot({ path: `.context/cv-contact-${width}.png` });
  });
}

test("additional Deloitte bullets grow the sheet and move the following page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/cv");
  const sheets = page.locator(".page");
  const before = await sheets.first().boundingBox();
  await page
    .locator(".cv-role-bullets")
    .first()
    .evaluate((list) => {
      for (let index = 0; index < 12; index += 1) {
        const item = document.createElement("li");
        item.textContent =
          "Additional project detail used to verify that future Deloitte achievements remain visible and the document grows with its content.";
        list.append(item);
      }
    });
  const after = await sheets.first().boundingBox();
  const second = await sheets.nth(1).boundingBox();
  expect(after?.height).toBeGreaterThan(before?.height ?? 0);
  expect(second?.y).toBeGreaterThan((after?.y ?? 0) + (after?.height ?? 0));
  expect(
    await sheets
      .first()
      .evaluate((element) => element.scrollHeight <= element.clientHeight + 1)
  ).toBe(true);
});

test("CV still reveals itself when the client bundle fails to load", async ({
  page,
}) => {
  // The sheets start hidden so the landing does not flash settled content
  // during hydration. A CSS failsafe must reveal them when the JS never runs.
  // Block only the JavaScript. Turbopack emits CSS into the same chunks
  // directory, and blocking that too would make the sheets visible simply
  // because no stylesheet ever hid them.
  await page.route(/\/_next\/static\/chunks\/.*\.js$/, (route) =>
    route.abort()
  );
  await page.goto("/cv");
  await expect(
    page.getByRole("heading", { exact: true, name: "Connor Forsyth" })
  ).toBeVisible();
  await expect(page.locator(".page").first()).toHaveCSS("opacity", "1", {
    timeout: 10_000,
  });
  await expect(page.locator(".page").nth(1)).toHaveCSS("opacity", "1");
});

test("CV remains readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { height: 844, width: 390 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/cv`);
  await expect(
    page.getByRole("heading", { exact: true, name: "Connor Forsyth" })
  ).toBeVisible();
  await expect(page.locator(".page").first()).toHaveCSS("opacity", "1");
  await expect(
    page.getByRole("link", { name: "c@connorforsyth.co" })
  ).toHaveAttribute("href", "mailto:c@connorforsyth.co");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
  ).toBe(true);
  await context.close();
});

test("reduced motion cancels the landing and print keeps both sheets", async ({
  page,
}) => {
  await page.goto("/cv");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator("main")
        .evaluate((element) => element.getAnimations({ subtree: true }).length)
    )
    .toBe(0);
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  const portfolio = page.getByRole("link", {
    name: /^connorforsyth\.co\/portfolio/,
  });
  await expect(portfolio).toBeVisible();
  await expect(portfolio).toHaveText(
    (await portfolio.getAttribute("href"))?.replace("https://", "") ?? ""
  );
  await expect(
    page.getByRole("link", { name: "Download CV as PDF" })
  ).toBeHidden();
  const sheets = await page.locator(".page").all();
  await Promise.all(
    sheets.flatMap((sheet) => [
      expect(sheet).toHaveCSS("transform", "none"),
      expect(sheet).toHaveCSS("opacity", "1"),
      expect(sheet).toHaveCSS("min-height", "0px"),
    ])
  );
  await expect(page.locator(".page").nth(1)).toHaveCSS("break-before", "page");
  await page.screenshot({ fullPage: true, path: ".context/cv-print.png" });
  await page.pdf({
    format: "A4",
    path: ".context/cv-print.pdf",
    preferCSSPageSize: true,
    printBackground: true,
  });
});

test("download returns a real PDF without opening the print dialog", async ({
  page,
  request,
}) => {
  await page.goto("/cv");
  const link = page.getByRole("link", { name: "Download CV as PDF" });
  const href = await link.getAttribute("href");
  expect(href).toBe("/connor-forsyth-cv.pdf");
  const response = await request.get(href ?? "");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const downloadEvent = page.waitForEvent("download");
  await link.click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("Connor-Forsyth-CV.pdf");
  expect(await download.failure()).toBeNull();
});
