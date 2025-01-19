"use client";

import { useEffect, useRef, useState } from "react";

const figmaEmbedCode = "https://embed.figma.com/proto/";
const figmaProps =
  "&scaling=scale-down&content-scaling=fixed&show-proto-sidebar=1&share=1&embed-host=share&scaling=scale-down-width&hide-ui=1&hotspot-hints=0";
const uniquePage =
  "Br79Ro2yss1Mt03EqGcgAk/TfNSW-Prototype-%5BR1-Final-%E2%80%93-shared%5D?page-id=2046%3A40056&node-id=2057-56550&p=f&viewport=1555%2C887%2C0.07&starting-point-node-id=2057%3A56550";
const presentation = `IRxjN1QkNUk8ynq6gOvql3/CF-Portfolio-PDF?page-id=13%3A18132&node-id=13-18154&p=f&viewport=4803%2C-22702%2C1`;
const FigmaEmbed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== iframeRef.current) {
        if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
          iframeRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  // Fullscreen toggle.

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        if (iframeRef.current) {
          iframeRef.current.requestFullscreen();
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // iframe size control.

  const calculateDimensions = () => {
    const PADDING = window.innerWidth > 600 ? 32 : 16;
    let SCALE_FACTOR = window.innerWidth > 2000 ? 1 : 0.66;
    const MAX_WIDTH = 1920;

    const VIEWPORT_HEIGHT = window.innerHeight;
    const VIEWPORT_WIDTH = window.innerWidth;

    // First calculate maximum possible width
    let width = Math.min(
      VIEWPORT_WIDTH - PADDING,
      VIEWPORT_HEIGHT * (16 / 9) - PADDING,
      MAX_WIDTH * SCALE_FACTOR,
    );

    // Force width to be divisible by 16
    width = Math.floor(width / 16) * 16;

    // Calculate exact height for 16:9
    let height = (width / 16) * 9;

    setDimensions({ width, height });
  };

  useEffect(() => {
    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, []);

  return (
    <div className="grid h-svh place-items-center overflow-clip">
      <iframe
        ref={iframeRef}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          border: "none",
        }}
        src={`${figmaEmbedCode}${presentation}${figmaProps}`}
        allow="fullscreen"
        tabIndex={0}
      />
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 hidden rounded-md bg-zinc-800 p-2 text-xs text-white transition-all hover:bg-zinc-900 md:block"
      >
        Toggle Fullscreen
      </button>
    </div>
  );
};

export default function Page() {
  return <FigmaEmbed />;
}
