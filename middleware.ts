import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  "/x": {
    destination: "https://x.com/connorwforsyth",
    eventName: "x_redirect",
  },
  "/linkedin": {
    destination: "https://linkedin.com/in/connorwforsyth",
    eventName: "linkedin_redirect",
  },
  "/cv": {
    destination: "https://cv.connorforsyth.co",
    eventName: "cv_redirect",
  },
  "/github": {
    destination: "https://github.com/connorwforsyth",
    eventName: "github_redirect",
  },
  "/presentation": {
    destination: "https://connorforsyth.co/portfolio",
    eventName: "portfolio_redirect",
    permanent: true,
  },
  // Add more redirects as needed
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const redirect = REDIRECTS[path as keyof typeof REDIRECTS];

  if (redirect) {
    // Send the analytics event using a POST request
    fetch("https://app.posthog.com/capture/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_KEY}`,
      },
      body: JSON.stringify({
        api_key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
        event: redirect.eventName,
        distinct_id:
          request.cookies.get("ph_distinct_id")?.value || "unknown_user",
        properties: {
          $current_url: request.url,
          $pathname: path,
          destination: redirect.destination,
          referrer: request.headers.get("referer"),
          userAgent: request.headers.get("user-agent"),
        },
      }),
    }).catch(console.error); // Handle any errors silently to ensure redirect still works

    // Use permanent redirect if specified, otherwise default to temporary
    return redirect.permanent
      ? NextResponse.redirect(redirect.destination, { status: 301 })
      : NextResponse.redirect(redirect.destination);
  }
}

// Update the matcher to include all redirect paths
export const config = {
  matcher: Object.keys(REDIRECTS),
};
