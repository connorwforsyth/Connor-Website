import { type RefObject, useEffect, useState } from "react";
import magConfig from "@/components/MagConfig";
import { useMagnifier } from "@/context/MagnifierContext";

const _config = magConfig;

interface MagnifierConfig {
  borderColor: string;
  diameter: number;
  scale: number;
}

const defaultConfig: MagnifierConfig = {
  borderColor: "rgba(100, 100, 100, 0.5)",
  diameter: 160,
  scale: 2,
};

const Magnifier: React.FC<{
  iframeRef: RefObject<HTMLIFrameElement>;
  config?: Partial<MagnifierConfig>;
}> = ({ iframeRef, config = {} }) => {
  const { isMagnifierActive } = useMagnifier();
  const [iframeRect, setIframeRect] = useState<DOMRect | null>(null);

  const magnifierConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    if (!(isMagnifierActive && iframeRef.current)) {
      return;
    }

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

  if (!(isMagnifierActive && iframeRect)) {
    return null;
  }

  return (
    <>
      {/* Debug overlay to show iframe bounds */}
      <div
        style={{
          background: "rgba(255, 0, 0, 0.1)",
          height: iframeRect.height,
          left: iframeRect.left,
          pointerEvents: "none",
          position: "fixed",
          top: iframeRect.top,
          width: iframeRect.width,
          zIndex: 999_999_999_998,
        }}
      />
      <div
        style={{
          background: "transparent",
          border: `2px solid ${magnifierConfig.borderColor}`,
          borderRadius: "50%",
          boxShadow: `
            0px 4px 16px rgba(17,17,26,0.1),
            0px 8px 24px rgba(17,17,26,0.1),
            0px 16px 56px rgba(17,17,26,0.1)
          `,
          height: `${magnifierConfig.diameter}px`,
          left: "0",
          overflow: "hidden",
          pointerEvents: "none",
          position: "fixed",
          top: "0",
          transform: `translate(${iframeRect.left}px, ${iframeRect.top}px) translate(-50%, -50%) scale(${magnifierConfig.scale})`,
          width: `${magnifierConfig.diameter}px`,
          zIndex: 999_999_999_999,
        }}
      />
    </>
  );
};

export default Magnifier;
