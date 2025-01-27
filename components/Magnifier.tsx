import { useEffect, useRef, useState, RefObject } from "react";
import magConfig from "@/components/MagConfig";
import { useMagnifier } from "@/context/MagnifierContext";

let config = magConfig;

interface MagnifierConfig {
  diameter: number;
  scale: number;
  borderColor: string;
}

const defaultConfig: MagnifierConfig = {
  diameter: 160,
  scale: 2,
  borderColor: "rgba(100, 100, 100, 0.5)",
};

interface MagnifierProps {
  iframeRef: RefObject<HTMLIFrameElement>;
}

interface Position {
  x: number;
  y: number;
}

const Magnifier: React.FC<{
  iframeRef: RefObject<HTMLIFrameElement>;
  config?: Partial<MagnifierConfig>;
}> = ({ iframeRef, config = {} }) => {
  const { isMagnifierActive } = useMagnifier();
  const [iframeRect, setIframeRect] = useState<DOMRect | null>(null);

  const magnifierConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    if (!isMagnifierActive || !iframeRef.current) return;

    const updateIframePosition = () => {
      if (iframeRef.current) {
        const rect = iframeRef.current.getBoundingClientRect();
        setIframeRect(rect);
      }
    };

    updateIframePosition();
    const resizeObserver = new ResizeObserver(updateIframePosition);
    resizeObserver.observe(iframeRef.current);

    window.addEventListener("scroll", updateIframePosition, true);
    window.addEventListener("resize", updateIframePosition);

    return () => {
      window.removeEventListener("scroll", updateIframePosition, true);
      window.removeEventListener("resize", updateIframePosition);
      resizeObserver.disconnect();
    };
  }, [isMagnifierActive, iframeRef]);

  if (!isMagnifierActive || !iframeRect) return null;

  return (
    <>
      {/* Debug overlay to show iframe bounds */}
      <div
        style={{
          position: "fixed",
          top: iframeRect.top,
          left: iframeRect.left,
          width: iframeRect.width,
          height: iframeRect.height,
          zIndex: 999999999998,
          pointerEvents: "none",
          background: "rgba(255, 0, 0, 0.1)",
        }}
      />
      <div
        style={{
          height: `${magnifierConfig.diameter}px`,
          width: `${magnifierConfig.diameter}px`,
          borderRadius: "50%",
          background: "transparent",
          border: `2px solid ${magnifierConfig.borderColor}`,
          position: "fixed",
          top: "0",
          left: "0",
          transform: `translate(${iframeRect.left}px, ${iframeRect.top}px) translate(-50%, -50%) scale(${magnifierConfig.scale})`,
          pointerEvents: "none",
          boxShadow: `
            0px 4px 16px rgba(17,17,26,0.1),
            0px 8px 24px rgba(17,17,26,0.1),
            0px 16px 56px rgba(17,17,26,0.1)
          `,
          zIndex: 999999999999,
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default Magnifier;
