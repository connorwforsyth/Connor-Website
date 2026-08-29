// Client-side instrumentation. Next.js runs this after the HTML loads but
// before React hydration, which makes it the recommended place to initialise
// PostHog for the App Router (see PostHog's Next.js docs and
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md).
//
// There is no React <PostHogProvider> in the tree — nothing uses the
// `usePostHog` / feature-flag hooks — so components call the `posthog-js`
// singleton directly (e.g. components/access-form.tsx).
import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Routed through the Next.js rewrites in next.config.mjs (`/ingest/*`) so
// requests are first-party and survive tracker blockers. Override with an
// absolute PostHog host if the rewrites are ever removed.
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "/ingest";

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    // Opt into the current defaults: history-API pageviews (needed for App
    // Router client navigations), pageleave capture, and identified-only
    // person profiles.
    defaults: "2025-05-24",
    // "Open in PostHog" links and the toolbar need the real dashboard origin;
    // the rewrites point at the US cloud region.
    ui_host: "https://us.posthog.com",
  });
}
