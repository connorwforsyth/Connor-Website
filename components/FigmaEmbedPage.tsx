"use client";
import Caption from './Caption';
import { useEffect, useState } from 'react';

export default function FigmaEmbed() {
    const [showFrame, setShowFrame] = useState(false);

 useEffect(() => {
    const checkScreenSize = () => {
      setShowFrame(window.innerWidth > 768);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Empty dependency array means this effect runs once on mount

  if (!showFrame) {
    return <Caption>This component is only visible on desktop.</Caption>;
  }
  return (
    <div>
      <div className="w-full max-w-5xl mx-auto rounded-[8px] border border-zinc-300 bg-zinc-300 p-[4px] shadow-md *:rounded-[4px] dark:bg-white dark:bg-opacity-50 md:rounded-[12px] md:border-white md:bg-white md:bg-opacity-50 md:p-[8px] md:*:rounded-[6px]">
        <iframe
          className="relative aspect-[3/2] w-full overflow-clip bg-white"
          style={{
            zoom: 0.66,
          }}
          src="https://embed.figma.com/design/lMP0N0ccmMFHejQKESZ1eb/Origin-Zero-x-Designit_-MBA-2.0-Redesign_-Advanced-Features-Exploration?node-id=26-46&embed-host=share"
          allowFullScreen
        />
      </div>
      <Caption>We conducted a workshop with stakeholders to share and prioritise the aspirational concepts.</Caption>
    </div>
  );
}
