"use client";

import { useEffect, useRef, useState } from "react";
import { getSession } from "@/server-actions/actions";
import { formatDistanceToNow } from "date-fns";

const figmaEmbedCode = "https://embed.figma.com/proto/";
const figmaProps =
  "&scaling=scale-down-width&share=1&embed-host=share&hide-ui=1&hotspot-hints=0&theme=system&device-frame=false";
const presentation = `IRxjN1QkNUk8ynq6gOvql3/CF-Portfolio-PDF?page-id=13%3A18132&node-id=13-18154&p=f&viewport=4803%2C-22702%2C1`;
const fileKey = "IRxjN1QkNUk8ynq6gOvql3";

const FigmaEmbed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [name, setName] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Extract file key from the presentation URL

  useEffect(() => {
    // Fetch session data on component mount
    const fetchSession = async () => {
      const session = await getSession();
      const plainSession = {
        name: session.name,
      };
      setName(plainSession.name || "");
    };
    fetchSession();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchLastUpdated = async () => {
      console.log("Fetching last updated time..."); // Client-side log
      try {
        const response = await fetch(
          `/api/figma-last-updated?fileKey=${fileKey}`,
        );

        console.log("Response status:", response.status); // Check response status
        if (!response.ok) {
          console.error("Failed to fetch:", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Received data:", data); // Check received data

        if (data.lastModified && isMounted) {
          const date = new Date(data.lastModified);
          const timeAgo = formatDistanceToNow(date, { addSuffix: true });
          setLastUpdated(timeAgo);
          console.log("Updated timestamp:", timeAgo); // Check final formatted time
        }
      } catch (error) {
        console.error("Error fetching last updated time:", error);
      }
    };

    fetchLastUpdated();

    return () => {
      isMounted = false;
    };
  }, [fileKey]);

  // Keyboard navigation
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
        width={dimensions.width}
        height={dimensions.height}
        style={{
          border: "none",
        }}
        src={`${figmaEmbedCode}${presentation}${figmaProps}`}
        allow="fullscreen"
        tabIndex={0}
      />
      <div className="absolute bottom-4 right-4 z-[100] flex items-center gap-4">
        {lastUpdated && (
          <p className="text-xs opacity-50">Last updated: {lastUpdated}</p>
        )}
        {name && (
          <p className="text-xs">
            Welcome {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          </p>
        )}
        <button
          tabIndex={1}
          onClick={toggleFullscreen}
          className="hidden rounded-md bg-zinc-800 p-2 text-xs text-white transition-all hover:bg-zinc-900 md:block"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  return <FigmaEmbed />;
}
