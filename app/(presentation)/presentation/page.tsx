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

  const calculateDimensions = () => {
    const SCALE_FACTOR = 1;
    const ASPECT_RATIO = 1920 / 1080;
    const MAX_WIDTH = 1920;
    const MAX_HEIGHT = 1080;
    const VIEWPORT_HEIGHT_PERCENT = window.innerHeight * 0.9; // 90vh

    const width = Math.min(
      window.innerWidth,
      VIEWPORT_HEIGHT_PERCENT * ASPECT_RATIO,
      MAX_WIDTH * SCALE_FACTOR,
    );

    const height = Math.min(
      window.innerWidth / ASPECT_RATIO,
      VIEWPORT_HEIGHT_PERCENT,
      MAX_HEIGHT * SCALE_FACTOR,
    );

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
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        display: "grid",
        placeContent: "center",
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          border: "none",
        }}
        src={`${figmaEmbedCode}${presentation}${figmaProps}`}
        allowFullScreen
      />
    </div>
  );
};

export default function Page() {
  return <FigmaEmbed />;
}
