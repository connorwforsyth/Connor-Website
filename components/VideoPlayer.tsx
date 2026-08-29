"use client";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type CompTypes = {
  url: string;
  className?: string;
};

// Render a YouTube video player
export default function CompPlayer({ url }: CompTypes) {
  return (
    <div className="relative mx-auto flex aspect-video h-full w-full max-w-5xl overflow-clip rounded-md">
      <ReactPlayer
        autoplay={true}
        className="react-player absolute inset-0"
        height="100"
        loop={true}
        muted={true}
        playing={true}
        playsinline
        url={url}
        width="100"
      />
    </div>
  );
}
