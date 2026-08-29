import type { FrameLoopHandle } from "vgpu";
import { clock, effect, frameLoop, init, surface } from "vgpu";
import tableShader from "./table-scene.wgsl";

export type SheetSample = {
  /** Landing footprint: center x/y and half width/height, in CSS px. */
  rect: readonly [number, number, number, number];
  /** Height above the tabletop in px; 0 = landed. */
  lift: number;
};

/** Called once per frame; positions the sheets and reports where they are. */
export type SampleSheets = (timeSeconds: number) => readonly SheetSample[];

const OFFSCREEN_RECT = [-4096, -4096, 0, 0] as const;

/**
 * Starts the daylight-table render loop on `canvas`. Returns a teardown
 * function; `onFailure` fires if WebGPU is unavailable or init fails so the
 * caller can switch to a CSS fallback.
 */
export function startTableScene(
  canvas: HTMLCanvasElement,
  sampleSheets: SampleSheets,
  onFailure: () => void
): () => void {
  let disposed = false;
  let loop: FrameLoopHandle | undefined;
  let gpu: Awaited<ReturnType<typeof init>> | undefined;

  const start = async () => {
    gpu = await init();
    if (disposed) {
      gpu.dispose();
      return;
    }

    const canvasSurface = surface(gpu, canvas, { dpr: [1, 2] });
    const table = effect(gpu, tableShader, {
      label: "cv-table",
      set: {
        params: {
          lifts: [0, 0],
          pad: [0, 0],
          rect0: OFFSCREEN_RECT,
          rect1: OFFSCREEN_RECT,
          sheet_count: 0,
          time: 0,
          viewport: [canvas.clientWidth, canvas.clientHeight],
        },
      },
    });

    const time = clock(gpu);
    loop = frameLoop(gpu, (frame) => {
      const [first, second] = sampleSheets(time.time);
      table.set({
        params: {
          lifts: [first?.lift ?? 0, second?.lift ?? 0],
          rect0: first ? first.rect : OFFSCREEN_RECT,
          rect1: second ? second.rect : OFFSCREEN_RECT,
          sheet_count: (first ? 1 : 0) + (second ? 1 : 0),
          time: time.time,
          viewport: [canvas.clientWidth, canvas.clientHeight],
        },
      });
      frame.pass(canvasSurface, table);
    });
  };

  start().catch(() => {
    if (!disposed) {
      onFailure();
    }
  });

  return () => {
    disposed = true;
    loop?.stop();
    gpu?.dispose();
  };
}
