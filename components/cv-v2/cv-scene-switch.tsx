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
 * On mobile, renders `children` directly as plain HTML — native scroll,
 * zoom, and text selection. On larger screens, renders the WebGL
 * cloth-paper scene when the device can, and the DOM scene (which has its
 * own CSS fallback) otherwise. `fallback` also serves as the pre-hydration
 * content, so the CV is never missing.
 */
export function CvSceneSwitch({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
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
    return (
      <>
        <PaperScene />
        {/* Screen-reader and copy-paste access to the same content. */}
        <div className="sr-only">{children}</div>
      </>
    );
  }
  if (mode === "plain") {
    return <div className="cv-v2-plain">{children}</div>;
  }
  return <>{fallback}</>;
}
