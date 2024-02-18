"use client";
import { useEffect, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

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
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div className="br fixed right-3 top-3 z-10 rounded-lg border bg-white bg-opacity-50 px-1.5 text-sm text-stone-500 dark:bg-stone-900 dark:text-current">
                Offline
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                sideOffset={1}
                className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade z-10 mr-3 select-none rounded-lg bg-stone-200 px-2 py-1 text-sm leading-none text-black shadow-md will-change-[transform,opacity]"
              >
                <Tooltip.Arrow className="fill-stone-200" />
                Your device is offline
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </>
    );
  }
  return null;
}
