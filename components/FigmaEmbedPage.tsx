import { useEffect, useState } from 'react';

export default function FigmaEmbed() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShouldRender(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!shouldRender) {
    return <></>;
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
    </div>
  );
}
