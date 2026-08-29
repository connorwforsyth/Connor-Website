import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PostHog } from "posthog-node";

// Define your redirects in a map for easy maintenance
const REDIRECTS: Record<
  string,
  {
    destination: string;
    eventName: string;
    permanent?: boolean;
  }
> = {
  "/chat": {
    destination:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3biRg4mJVZ-7Su6oo1WwGuBbpPbhluqJ5COwrICua5MuisV61_yWilOEcRWCkZcnFNSo1JzWA6?gv=true",
    eventName: "calendar_redirect",
  },
  "/github": {
    destination: "https://github.com/connorwforsyth",
    eventName: "github_redirect",
  },
  "/linkedin": {
    destination: "https://linkedin.com/in/connorwforsyth",
    eventName: "linkedin_redirect",
  },
  "/portfolio": {
    destination: "/presentation",
    eventName: "presentation_redirect",
    permanent: true,
  },
  "/raycast": {
    destination: "https://raycast.com/?via=connor",
    eventName: "raycast_redirect",
    permanent: true,
  },
  "/x": {
    destination: "https://x.com/connorwforsyth",
    eventName: "x_redirect",
  },
  // Add more redirects as needed
};

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Server-side PostHog reaches the cloud directly — the `/ingest` rewrite in
// next.config.mjs only exists for the browser SDK.
const POSTHOG_HOST = "https://us.i.posthog.com";

// posthog-js stores its state in a `ph_<key>_posthog` cookie whose value is
// JSON. Reading `distinct_id` from it lets a shortlink hit attribute to the
// same person as their browser session instead of a brand-new anonymous id.
const readBrowserDistinctId = (request: NextRequest): string | undefined => {
  if (!POSTHOG_KEY) {
    return;
  }
  const raw = request.cookies.get(`ph_${POSTHOG_KEY}_posthog`)?.value;
  if (!raw) {
    return;
  }
  try {
    const parsed = JSON.parse(raw) as { distinct_id?: string };
    return parsed.distinct_id;
  } catch {
    // Malformed cookie — fall through to an anonymous id.
  }
};

const captureRedirect = (
  request: NextRequest,
  event: NextFetchEvent,
  {
    slug,
    eventName,
    destination,
  }: { slug: string; eventName: string; destination: string }
): void => {
  if (!POSTHOG_KEY) {
    return;
  }

  const client = new PostHog(POSTHOG_KEY, {
    // One event per invocation in a short-lived serverless function: send it
    // immediately rather than waiting to batch.
    flushAt: 1,
    flushInterval: 0,
    host: POSTHOG_HOST,
  });

  const browserDistinctId = readBrowserDistinctId(request);

  client.capture({
    distinctId: browserDistinctId ?? crypto.randomUUID(),
    event: eventName,
    properties: {
      $current_url: request.url,
      $pathname: slug,
      $raw_user_agent: request.headers.get("user-agent"),
      destination,
      referrer: request.headers.get("referer"),
      slug,
      // Don't create a person profile for anonymous shortlink hits.
      ...(browserDistinctId ? {} : { $process_person_profile: false }),
    },
  });

  // Keep the function alive until the event is flushed, but don't make the
  // visitor wait on it before redirecting.
  event.waitUntil(client.shutdown());
};

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;
  const redirect = REDIRECTS[path as keyof typeof REDIRECTS];

  if (!redirect) {
    return;
  }

  const destinationUrl = new URL(redirect.destination, request.url);
  destinationUrl.search = request.nextUrl.search;

  captureRedirect(request, event, {
    destination: destinationUrl.toString(),
    eventName: redirect.eventName,
    slug: path,
  });

  // Use permanent redirect if specified, otherwise default to temporary
  return redirect.permanent
    ? NextResponse.redirect(destinationUrl, { status: 301 })
    : NextResponse.redirect(destinationUrl);
}

// Turbopack/webpack require `matcher` to be statically analyzable, so this
// can no longer be derived dynamically via `Object.keys(REDIRECTS)`. Keep
// this array in sync with the keys of REDIRECTS above whenever a redirect
// path is added or removed.
export const config = {
  matcher: ["/chat", "/x", "/linkedin", "/github", "/portfolio", "/raycast"],
};
