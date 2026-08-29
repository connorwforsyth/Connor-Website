"use client";

import { usePathname } from "next/navigation";
import { posthog } from "posthog-js";
import { useEffect } from "react";

// Renders nothing; fires a single PostHog event when a 404 page mounts so
// broken links and mistyped URLs show up in analytics.
export function TrackNotFound() {
  const pathname = usePathname();

  useEffect(() => {
    posthog.capture("page_not_found", { pathname });
  }, [pathname]);

  return null;
}
