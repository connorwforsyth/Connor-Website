import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

// Thin wrapper so layouts import one local component; the `/next` entrypoint
// tracks App Router navigations automatically.
export function Analytics() {
  return <VercelAnalytics />;
}
