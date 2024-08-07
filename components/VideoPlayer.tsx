"use client";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type CompTypes = {
  url?: string;
  className?: string;
};

// Render a YouTube video player
export default function CompPlayer() {
  return (
    <div className="relative mx-auto my-5 flex aspect-video h-full w-full max-w-5xl overflow-clip rounded-md">
      <ReactPlayer
        className="react-player absolute inset-0"
        loop={true}
        playing={true}
        autoplay={true}
        url="https://player.vimeo.com/930249725?autoplay"
        muted={true}
        height="100"
        playsinline
        width="100"
      />
    </div>
  );
}
