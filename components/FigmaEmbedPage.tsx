"use client";
import { useEffect, useState } from "react";
import Caption from "./Caption";

export default function FigmaEmbed() {
  const [showFrame, setShowFrame] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowFrame(window.innerWidth > 768);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []); // Empty dependency array means this effect runs once on mount

  if (!showFrame) {
    return <Caption>This component is only visible on desktop.</Caption>;
  }
  return (
    <div>
      <div className="mx-auto w-full max-w-5xl rounded-[8px] border border-zinc-300 bg-zinc-300 p-[4px] shadow-md *:rounded-[4px] md:rounded-[12px] md:bg-white/50 md:p-[8px] md:*:rounded-[6px] dark:bg-white/50">
        <iframe
          allowFullScreen
          className="relative aspect-[3/2] w-full overflow-clip bg-white"
          src="https://embed.figma.com/design/lMP0N0ccmMFHejQKESZ1eb/Origin-Zero-x-Designit_-MBA-2.0-Redesign_-Advanced-Features-Exploration?node-id=26-46&embed-host=share"
          style={{
            zoom: 0.66,
          }}
          title="Figma embed"
        />
      </div>
      <Caption>
        We conducted a workshop with stakeholders to share and prioritise the
        aspirational concepts.
      </Caption>
    </div>
  );
}
