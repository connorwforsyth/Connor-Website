"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

type SpringSample = {
  position: number;
  velocity: number;
};

const DURATION_MS = 2200;
const FIRST_PAGE_PLAYBACK_RATE = 1.8;
const FOLLOWING_PAGE_PLAYBACK_RATE = 1.56;
const LANDING_DAMPING_RATIO = 0.8;
const FRAME_COUNT = 90;
const STAGGER_MS = 160;
const FADE_DURATION_MS = 440;
const FOLLOWING_FADE_DELAY_MS = 120;
const SETTLED_SECONDS = 30;
const MOTION_QUERY =
  "(prefers-reduced-motion: reduce), (max-width: 768px), print";

function sampleSpring(
  initialPosition: number,
  angularFrequency: number,
  time: number,
  dampingRatio = 1
): SpringSample {
  if (time <= 0) {
    return { position: initialPosition, velocity: 0 };
  }
  if (time >= SETTLED_SECONDS) {
    return { position: 0, velocity: 0 };
  }
  // Underdamping adds a small rebound; lateral drift stays critically damped.
  if (dampingRatio < 1) {
    const decayRate = dampingRatio * angularFrequency;
    const dampedFrequency = angularFrequency * Math.sqrt(1 - dampingRatio ** 2);
    const decay = Math.exp(-decayRate * time);
    const phase = dampedFrequency * time;
    return {
      position:
        initialPosition *
        decay *
        (Math.cos(phase) + (decayRate / dampedFrequency) * Math.sin(phase)),
      velocity:
        ((-initialPosition * angularFrequency ** 2) / dampedFrequency) *
        decay *
        Math.sin(phase),
    };
  }
  const decay = Math.exp(-angularFrequency * time);
  return {
    position: initialPosition * (1 + angularFrequency * time) * decay,
    velocity:
      -initialPosition * angularFrequency * angularFrequency * time * decay,
  };
}

function landingFrames(index: number): Keyframe[] {
  const direction = index % 2 === 0 ? 1 : -1;
  const fadeDelay = index === 0 ? 0 : FOLLOWING_FADE_DELAY_MS;
  return Array.from({ length: FRAME_COUNT + 1 }, (_, frame) => {
    const offset = frame / FRAME_COUNT;
    if (frame === FRAME_COUNT) {
      return { offset, opacity: 1, transform: "none" };
    }
    const elapsed = offset * DURATION_MS;
    const time = elapsed / 1000;
    const height = sampleSpring(200, 5.5, time, LANDING_DAMPING_RATIO);
    const drift = sampleSpring(direction * 14, 5, time);
    const tilt = -height.velocity * 0.014;
    const twist = drift.velocity * 0.02;
    return {
      offset,
      opacity: Math.min(
        1,
        Math.max(0, (elapsed - fadeDelay) / FADE_DURATION_MS)
      ),
      transform: `perspective(1500px) translate3d(${drift.position}px, ${-height.position * 0.12}px, ${height.position * 0.4}px) rotateX(${tilt}deg) rotateZ(${twist}deg)`,
    };
  });
}

export function PaperLanding({ children }: { children: ReactNode }) {
  const documentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const documentElement = documentRef.current;
    if (!documentElement) {
      return;
    }
    const motion = window.matchMedia(MOTION_QUERY);
    const pages = Array.from(
      documentElement.querySelectorAll<HTMLElement>(".page")
    );
    const animations: Animation[] = [];
    const settle = () => {
      for (const animation of animations) {
        animation.cancel();
      }
      for (const page of pages) {
        page.style.opacity = "1";
        page.style.transform = "none";
      }
    };

    if (motion.matches) {
      settle();
    } else {
      for (const [index, page] of pages.entries()) {
        page.style.opacity = "0";
        page.style.transform = "none";
        const animation = page.animate(landingFrames(index), {
          delay: index * STAGGER_MS,
          duration: DURATION_MS,
          easing: "linear",
          fill: "both",
        });
        animation.playbackRate =
          index === 0 ? FIRST_PAGE_PLAYBACK_RATE : FOLLOWING_PAGE_PLAYBACK_RATE;
        animations.push(animation);
        animation.finished
          .then(() => {
            page.style.opacity = "1";
            page.style.transform = "none";
            animation.cancel();
          })
          .catch(() => {
            // Cancelling a Web Animation rejects its finished promise.
          });
      }
    }

    const onMotionChange = () => {
      if (motion.matches) {
        settle();
      }
    };
    motion.addEventListener("change", onMotionChange);
    window.addEventListener("beforeprint", settle);
    documentElement.addEventListener("focusin", settle);
    return () => {
      for (const animation of animations) {
        animation.cancel();
      }
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("beforeprint", settle);
      documentElement.removeEventListener("focusin", settle);
    };
  }, []);

  return (
    <main className="cv-document cv-document--landing" ref={documentRef}>
      <noscript>
        <style>
          {
            ".cv-document--landing .page { opacity: 1 !important; transform: none !important; }"
          }
        </style>
      </noscript>
      {children}
    </main>
  );
}
