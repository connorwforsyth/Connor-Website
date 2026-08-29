"use client";

import { useEffect, useRef, useState } from "react";
import { type SheetSample, startTableScene } from "./table-scene";

// Glide choreography (seconds unless noted). Each sheet drifts down from
// DROP_HEIGHT_PX like paper falling through air — a fast first moment, then
// a long deceleration with a gentle side-to-side sway — while the shader
// tightens its shadow from a wide airborne haze to a crisp contact shadow.
const FIRST_DROP_DELAY = 0.35;
const SHEET_STAGGER = 0.55;
const GLIDE_DURATION = 1.9;
const GLIDE_EXPONENT = 3;
const DROP_HEIGHT_PX = 260;
const VISUAL_RISE_RATIO = 0.5;
const SCALE_PER_LIFT_PX = 1 / 3200;
const SWAY_PX = 15;
const SWAY_CYCLES = 1.4;
const SWAY_TILT_DEG_PER_PX = 0.045;
const FADE_IN = 0.4;
const START_ROTATIONS_DEG = [-1.9, 1.5];
const REST_ROTATIONS_DEG = [0.4, -0.3];
const MAX_SHEETS = 2;

// Fraction of the drop height remaining at local time `t`: 1 = airborne,
// 0 = resting on the table. Ease-out cubic reads as air resistance.
function liftFractionAt(t: number): number {
  if (t <= 0) {
    return 1;
  }
  if (t >= GLIDE_DURATION) {
    return 0;
  }
  return (1 - t / GLIDE_DURATION) ** GLIDE_EXPONENT;
}

function poseSheet(
  sheet: HTMLElement,
  index: number,
  local: number
): SheetSample {
  const fraction = liftFractionAt(local);
  const progress = 1 - fraction;
  const lift = fraction * DROP_HEIGHT_PX;
  const scale = 1 + lift * SCALE_PER_LIFT_PX;
  const rise = lift * VISUAL_RISE_RATIO;
  const direction = index % 2 === 0 ? 1 : -1;
  const sway =
    direction * Math.sin(progress * Math.PI * SWAY_CYCLES) * SWAY_PX * fraction;
  const rest = REST_ROTATIONS_DEG[index] ?? 0;
  const start = START_ROTATIONS_DEG[index] ?? 0;
  const rotation =
    rest + (start - rest) * fraction + sway * SWAY_TILT_DEG_PER_PX;

  sheet.style.opacity = String(
    Math.min(1, Math.max(0, (local + FADE_IN) / FADE_IN))
  );
  sheet.style.transform = `translate(${sway}px, ${-rise}px) rotate(${rotation}deg) scale(${scale})`;

  // Undo the transform we just applied so the shadow tracks the landing
  // footprint on the table rather than the airborne paper.
  const measured = sheet.getBoundingClientRect();
  return {
    lift,
    rect: [
      measured.left + measured.width / 2 - sway,
      measured.top + measured.height / 2 + rise,
      measured.width / 2 / scale,
      measured.height / 2 / scale,
    ],
  };
}

function settleSheets(sheets: HTMLElement[]) {
  for (const [index, sheet] of sheets.entries()) {
    sheet.style.opacity = "1";
    sheet.style.transform = `rotate(${REST_ROTATIONS_DEG[index] ?? 0}deg)`;
  }
}

export function CvTableScene({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sheetsRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = sheetsRef.current;
    if (!(canvas && container)) {
      return;
    }

    const sheets = Array.from(
      container.querySelectorAll<HTMLElement>(".page")
    ).slice(0, MAX_SHEETS);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!("gpu" in navigator)) {
      settleSheets(sheets);
      setFallback(true);
      return;
    }

    let startTime: number | undefined;
    const sample = (time: number): SheetSample[] => {
      startTime ??= time;
      const elapsed = time - startTime;
      return sheets.map((sheet, index) => {
        const local = reduceMotion
          ? Number.POSITIVE_INFINITY
          : elapsed - FIRST_DROP_DELAY - index * SHEET_STAGGER;
        return poseSheet(sheet, index, local);
      });
    };

    return startTableScene(canvas, sample, () => {
      settleSheets(sheets);
      setFallback(true);
    });
  }, []);

  return (
    <div className={fallback ? "cv-v2-root cv-v2-fallback" : "cv-v2-root"}>
      <canvas aria-hidden className="cv-v2-canvas" ref={canvasRef} />
      <div className="cv-v2-sheets" ref={sheetsRef}>
        {children}
      </div>
    </div>
  );
}
