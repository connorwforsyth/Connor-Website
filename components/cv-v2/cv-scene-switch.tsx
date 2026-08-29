"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PaperScene = dynamic(() => import("./paper-scene"), { ssr: false });

function hasWebGl(): boolean {
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * Renders the WebGL cloth-paper scene when the device can, and the DOM
 * scene (which has its own CSS fallback) otherwise. `fallback` also serves
 * as the pre-hydration content, so the CV is never missing.
 */
export function CvSceneSwitch({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const [mode, setMode] = useState<"pending" | "webgl" | "fallback">("pending");

  useEffect(() => {
    setMode(hasWebGl() ? "webgl" : "fallback");
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
  return <>{fallback}</>;
}
