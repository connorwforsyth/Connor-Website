"use client";

import { cn } from "@/lib/utils";
import { NavigationButton } from "./NavigationButton";

import { useEffect, useRef, useState } from "react";
import { getSession } from "@/server-actions/actions";
import { formatDistanceToNow } from "date-fns";

const figmaDomain = "https://embed.figma.com/proto/";
const figmaProps =
  "&scaling=scale-down-width&share=1&embed-host=share&hide-ui=1&hotspot-hints=0&theme=system&device-frame=false";
const presentation = `IRxjN1QkNUk8ynq6gOvql3/CF-Portfolio-PDF?page-id=13%3A18132&node-id=13-18154&p=f&viewport=4803%2C-22702%2C1`;
const clientId = "&client-id=FdThHDFIsJFvWm4uNuG74k";
const figmaOrigin = "https://www.figma.com/";
const embedCode = `${figmaDomain}${presentation}${figmaProps}${clientId}`;

const fileKey = "IRxjN1QkNUk8ynq6gOvql3";
const CACHE_DURATION = 3600; // 1 hour in seconds

const FigmaEmbed = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [name, setName] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const navigate = (direction: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: `NAVIGATE_${direction}`,
      },
      figmaOrigin,
    );
  };

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
      try {
        const response = await fetch(
          `/api/figma-last-updated?fileKey=${fileKey}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `Failed to fetch: ${response.statusText}`,
          );
        }

        if (data.lastModified && isMounted) {
          const date = new Date(data.lastModified);
          const timeAgo = formatDistanceToNow(date, { addSuffix: true });
          setLastUpdated(timeAgo);
        }
      } catch (error) {
        console.error("Error fetching last updated time:", error);
        // Don't show error UI for last updated time failures
        setLastUpdated("");
      }
    };

    fetchLastUpdated();

    // Refresh the last updated time every hour
    const refreshInterval = setInterval(
      fetchLastUpdated,
      CACHE_DURATION * 1000,
    );

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="relative grid h-dvh place-items-center overflow-clip">
      <iframe
        ref={iframeRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          border: "none",
          zoom: isFullscreen ? "100%" : "100%",
        }}
        src={embedCode}
        allow="fullscreen"
      />
      <div className="absolute bottom-0 flex w-full items-center p-4 md:justify-between">
        <div className="hidden w-full gap-4 sm:flex">
          {name && (
            <p className="text-xs">
              Welcome{" "}
              {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
            </p>
          )}
          {lastUpdated && (
            <p className="text-xs opacity-50">Updated: {lastUpdated}</p>
          )}
        </div>
        <div className="flex w-full gap-2 *:w-full *:select-none *:justify-center *:rounded-md *:bg-zinc-800 *:p-4 *:text-white *:transition-all sm:w-auto *:sm:w-auto *:sm:p-2">
          <NavigationButton
            direction="BACKWARD"
            onClick={() => navigate("BACKWARD")}
          />
          <NavigationButton
            direction="FORWARD"
            onClick={() => navigate("FORWARD")}
          />
          <button
            onClick={toggleFullscreen}
            className="hidden text-xs hover:bg-zinc-700 md:block"
            tabIndex={0}
            onKeyDown={(e) => e.key === "f" && toggleFullscreen}
          >
            Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <FigmaEmbed />;
}
