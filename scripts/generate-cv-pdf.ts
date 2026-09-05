/**
 * Renders the /cv route to a print-accurate PDF at public/connor-forsyth-cv.pdf.
 *
 * This replaces relying on the visitor's `window.print()` dialog: the output is
 * canonical, has no browser-injected header/footer, keeps selectable (ATS-safe)
 * text, and works the same regardless of who downloads it.
 *
 * Usage:
 *   bun run cv:pdf                       # spawns a dev server, renders, exits
 *   CV_PDF_BASE_URL=http://host bun ...  # renders against an already-running server
 */

import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { chromium } from "@playwright/test";

const OUTPUT_PATH = resolve(
  import.meta.dirname,
  "../public/connor-forsyth-cv.pdf"
);
const CV_PATH = "/cv";
const PORT = 3210;
const SERVER_READY_TIMEOUT_MS = 120_000;
const PAGE_LOAD_TIMEOUT_MS = 120_000;
const POLL_INTERVAL_MS = 500;

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
  const child = spawn(
    "node",
    [
      resolve(import.meta.dirname, "../node_modules/next/dist/bin/next"),
      "dev",
      "--port",
      String(PORT),
    ],
    {
      env: { ...process.env, PLAYWRIGHT: "true" },
      stdio: "inherit",
    }
  );
  return {
    baseUrl: `http://127.0.0.1:${PORT}`,
    stop: async () => {
      if (child.exitCode !== null || child.signalCode !== null) {
        return;
      }
      const exited = once(child, "exit");
      child.kill("SIGTERM");
      await exited;
    },
  };
}

async function renderPdf(baseUrl: string) {
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const response = await page.goto(`${baseUrl}${CV_PATH}`, {
      timeout: PAGE_LOAD_TIMEOUT_MS,
      waitUntil: "networkidle",
    });
    if (!response?.ok()) {
      throw new Error(
        `Could not render ${CV_PATH}: HTTP ${response?.status()}`
      );
    }
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      format: "A4",
      path: OUTPUT_PATH,
      preferCSSPageSize: true,
      printBackground: true,
    });
  } finally {
    await browser.close();
  }
}

async function main() {
  if (!process.env.ACCESS_CODE) {
    throw new Error(
      "ACCESS_CODE is not set. The CV links to /portfolio?code=<ACCESS_CODE>, so the PDF would embed an invalid code."
    );
  }

  if (externalBaseUrl) {
    await waitForServer(externalBaseUrl);
    await renderPdf(externalBaseUrl);
    console.log(`Wrote ${OUTPUT_PATH}`);
    return;
  }

  const server = startDevServer();
  try {
    await waitForServer(server.baseUrl);
    await renderPdf(server.baseUrl);
    console.log(`Wrote ${OUTPUT_PATH}`);
  } finally {
    await server.stop();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
