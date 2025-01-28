const { withNextVideo } = require("next-video/process");
const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/api/figma-last-updated",
        destination: "https://api.figma.com/v1/files/:path*",
      },
    ];
  },
};

module.exports = withNextVideo(withContentlayer(nextConfig));
