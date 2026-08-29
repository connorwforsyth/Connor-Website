"use client";

import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Offline() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Since this effect runs on mount, it will only execute on the client.
    setIsOffline(!navigator.onLine);

    // Event listeners for online/offline events
    const setOnline = () => setIsOffline(false);
    const setOffline = () => setIsOffline(true);

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    // Cleanup listeners when the component unmounts
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  // Render nothing on the server
  if (typeof window === "undefined") {
    return null;
  }

  // Now we only render the offline message if we're sure we're on the client side
  if (isOffline) {
    return (
      <>
        <style jsx>{`
          .br {
            border-radius: 0.6rem;
          }
        `}</style>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <div className="br fixed top-3 right-3 z-10 rounded-lg border bg-card px-1.5 text-muted-foreground text-sm">
                  Offline
                </div>
              }
            />
            <TooltipContent className="mr-3 select-none" sideOffset={1}>
              Your device is offline
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    );
  }
  return null;
}
