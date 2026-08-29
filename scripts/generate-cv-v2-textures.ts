/**
 * Screenshots the two CV sheets from /cv-v2/sheets at 2x into
 * public/cv-v2/page-1.png and page-2.png — the textures mapped onto the
 * bending paper meshes of the /cv-v2 WebGL scene. Re-run after editing
 * the CV content in components/cv-v2/cv-sheets.tsx.
 *
 * Usage:
 *   bun run cv:textures                      # spawns a dev server, renders, exits
 *   CV_PDF_BASE_URL=http://host bun ...      # renders against a running server
 */

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

const OUTPUT_DIR = resolve(import.meta.dirname, "../public/cv-v2");
const SHEETS_PATH = "/cv-v2/sheets";
const PORT = 3211;
const SERVER_READY_TIMEOUT_MS = 120_000;
const PAGE_LOAD_TIMEOUT_MS = 120_000;
const POLL_INTERVAL_MS = 500;
const TEXTURE_SCALE = 2;

const externalBaseUrl = process.env.CV_PDF_BASE_URL;

const delay = (ms: number) =>
  new Promise<void>((resolvePoll) => setTimeout(resolvePoll, ms));

async function waitForServer(baseUrl: string) {
  const deadline = Date.now() + SERVER_READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      // biome-ignore lint/performance/noAwaitInLoops: sequential polling until the dev server responds
      const response = await fetch(baseUrl, { method: "HEAD" });
      if (response.ok || response.status === 404) {
        return;
      }
    } catch {
      // server not up yet
    }
    await delay(POLL_INTERVAL_MS);
  }
  throw new Error(
    `Dev server did not become ready within ${SERVER_READY_TIMEOUT_MS}ms`
  );
}

function startDevServer() {
  const child = spawn("bun", ["run", "next", "dev", "--port", String(PORT)], {
    env: { ...process.env, PLAYWRIGHT: "true" },
    stdio: "inherit",
  });
  return {
    baseUrl: `http://127.0.0.1:${PORT}`,
    stop: () => {
      child.kill("SIGTERM");
    },
  };
}

async function render(baseUrl: string) {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      deviceScaleFactor: TEXTURE_SCALE,
      viewport: { height: 1400, width: 1200 },
    });
    await page.goto(`${baseUrl}${SHEETS_PATH}`, {
      timeout: PAGE_LOAD_TIMEOUT_MS,
      waitUntil: "networkidle",
    });
    const sheets = await page.locator(".page").all();
    if (sheets.length !== 2) {
      throw new Error(`Expected 2 .page sheets, found ${sheets.length}`);
    }
    for (const [index, sheet] of sheets.entries()) {
      // biome-ignore lint/performance/noAwaitInLoops: sequential per-sheet capture keeps memory flat
      await sheet.screenshot({
        path: resolve(OUTPUT_DIR, `page-${index + 1}.png`),
      });
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  if (externalBaseUrl) {
    await waitForServer(externalBaseUrl);
    await render(externalBaseUrl);
    return;
  }
  const server = startDevServer();
  try {
    await waitForServer(server.baseUrl);
    await render(server.baseUrl);
  } finally {
    server.stop();
  }
}

await main();
