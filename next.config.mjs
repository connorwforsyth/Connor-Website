/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // next-mdx-remote must be transpiled when using Turbopack:
  // https://github.com/vercel/next.js/issues/64525
  transpilePackages: ["next-mdx-remote"],
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
    ];
  },
};

export default nextConfig;
