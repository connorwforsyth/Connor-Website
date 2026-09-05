"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PaperScene = dynamic(() => import("./paper-scene"), { ssr: false });

// Below this width the paper-drop scene is a liability, not a delight: a
// hand-rolled touch-drag scroll fights the browser's own momentum
// scrolling, pinch-zoom, and text selection more than the effect adds.
// Small screens get the CV as plain, responsive HTML instead.
const MOBILE_QUERY = "(max-width: 768px)";

function hasWebGl(): boolean {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * On mobile, stacks the `pages` as plain HTML — native scroll, zoom, and
 * text selection. On larger screens, renders the paper scene when the
 * device can, and the DOM scene (which has its own CSS fallback)
 * otherwise. `fallback` also serves as the pre-hydration content, so the
 * CV is never missing.
 *
 * Every path renders the same real HTML: the scene transforms those exact
 * nodes in 3D rather than swapping in a picture of them.
 */
export function CvSceneSwitch({
  fallback,
  pages,
}: {
  fallback: React.ReactNode;
  pages: React.ReactNode[];
}) {
  const [mode, setMode] = useState<"fallback" | "pending" | "plain" | "webgl">(
    "pending"
  );

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY);
    const evaluate = () => {
      if (mobile.matches) {
        setMode("plain");
        return;
      }
      setMode(hasWebGl() ? "webgl" : "fallback");
    };
    evaluate();
    mobile.addEventListener("change", evaluate);
    return () => mobile.removeEventListener("change", evaluate);
  }, []);

  if (mode === "webgl") {
    return <PaperScene pages={pages} />;
  }
  if (mode === "plain") {
    return <div className="cv-v2-plain">{pages}</div>;
  }
  return <>{fallback}</>;
}
