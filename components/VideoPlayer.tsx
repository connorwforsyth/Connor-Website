"use client";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

type CompTypes = {
  url?: string;
  className?: string;
};

// Render a YouTube video player
export default function CompPlayer() {
  return (
    <div className="relative mx-auto my-5 flex aspect-video h-full w-full max-w-3xl overflow-clip rounded-md">
      <ReactPlayer
        className="absolute inset-0"
        loop={true}
        playing={true}
        url="https://vimeo.com/930249725"
        muted={true}
        height="100%"
        width="100%"
      />
    </div>
  );
}
