"use client";

import { useEffect, useRef, useState } from "react";
import { type SheetSample, startTableScene } from "./table-scene";

// Landing choreography. Every axis is a critically damped spring released
// from an initial displacement — the sheet literally is a damped physical
// system, so the glide, the flatten-out, and the settle all emerge from
// s(t) = s0·(1 + ωt)·e^(−ωt) instead of hand-drawn easing curves.
// Velocity couples into the tilts: the sheet planes on the air while it
// is moving and flattens as it slows, like paper falling in still air.
// Real depth comes from perspective() + translateZ, not a scale() fake.
const FIRST_DROP_DELAY = 0.3;
const SHEET_STAGGER = 0.6;
const DROP_HEIGHT_PX = 340;
const DROP_OMEGA = 2.1; // spring frequency of the descent (1/s)
const DRIFT_PX = 26; // sideways glide released alongside the descent
const DRIFT_OMEGA = 1.8;
const PERSPECTIVE_PX = 1400;
const RISE_RATIO = 0.35; // translateY per px of height
const DEPTH_RATIO = 0.5; // translateZ per px of height
const TILT_PER_SPEED = 0.036; // deg of rotateX per px/s of descent
const MAX_TILT_DEG = 11;
const TWIST_PER_SPEED = 0.055; // deg of rotateZ per px/s of drift
const REST_ROTATIONS_DEG = [0.4, -0.3];
const FADE_IN = 0.5;
const SETTLED_T = 30; // spring is numerically at rest past this (seconds)
const MAX_SHEETS = 2;

type Motion = { s: number; v: number };

// Critically damped spring released at rest from displacement s0.
function springAt(s0: number, omega: number, t: number): Motion {
  if (t <= 0) {
    return { s: s0, v: 0 };
  }
  if (t >= SETTLED_T) {
    return { s: 0, v: 0 };
  }
  const decay = Math.exp(-omega * t);
  return {
    s: s0 * (1 + omega * t) * decay,
    v: -s0 * omega * omega * t * decay,
  };
}

type SheetBase = {
  element: HTMLElement;
  direction: number;
  halfW: number;
  halfH: number;
  // Landing footprint center in page coordinates, so scrolling never
  // requires a re-measure.
  pageX: number;
  pageY: number;
};

// Measure landing footprints with transforms cleared; the next posed frame
// reapplies them.
function measureSheets(sheets: HTMLElement[]): SheetBase[] {
  for (const sheet of sheets) {
    sheet.style.transform = "none";
  }
  return sheets.map((element, index) => {
    const rect = element.getBoundingClientRect();
    return {
      direction: index % 2 === 0 ? 1 : -1,
      element,
      halfH: rect.height / 2,
      halfW: rect.width / 2,
      pageX: rect.left + rect.width / 2 + window.scrollX,
      pageY: rect.top + rect.height / 2 + window.scrollY,
    };
  });
}

function poseSheet(base: SheetBase, index: number, local: number): SheetSample {
  const height = springAt(DROP_HEIGHT_PX, DROP_OMEGA, local);
  const drift = springAt(base.direction * DRIFT_PX, DRIFT_OMEGA, local);
  const tilt = Math.max(
    -MAX_TILT_DEG,
    Math.min(MAX_TILT_DEG, -height.v * TILT_PER_SPEED)
  );
  const twist = (REST_ROTATIONS_DEG[index] ?? 0) + drift.v * TWIST_PER_SPEED;

  const { element } = base;
  element.style.opacity = String(
    Math.min(1, Math.max(0, (local + FADE_IN) / FADE_IN))
  );
  element.style.transform = `perspective(${PERSPECTIVE_PX}px) translate3d(${drift.s}px, ${-height.s * RISE_RATIO}px, ${height.s * DEPTH_RATIO}px) rotateX(${tilt}deg) rotateZ(${twist}deg)`;

  return {
    lift: height.s,
    rect: [
      base.pageX - window.scrollX + drift.s,
      base.pageY - window.scrollY,
      base.halfW,
      base.halfH,
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

    let bases = measureSheets(sheets);
    const remeasure = () => {
      bases = measureSheets(sheets);
    };
    window.addEventListener("resize", remeasure);

    let startTime: number | undefined;
    const sample = (time: number): SheetSample[] => {
      startTime ??= time;
      const elapsed = time - startTime;
      return bases.map((base, index) => {
        const local = reduceMotion
          ? SETTLED_T
          : elapsed - FIRST_DROP_DELAY - index * SHEET_STAGGER;
        return poseSheet(base, index, local);
      });
    };

    const stopScene = startTableScene(canvas, sample, () => {
      settleSheets(sheets);
      setFallback(true);
    });

    return () => {
      window.removeEventListener("resize", remeasure);
      stopScene();
    };
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
