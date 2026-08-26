import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

const withMDX = createMDX({
  options: {
    // remark-frontmatter makes the mdx compiler recognize the leading
    // --- yaml --- block as frontmatter instead of rendering it as text.
    // The frontmatter values themselves are read separately via gray-matter
    // in lib/content.ts.
    //
    // Plugin names are passed as strings (rather than imported function
    // references) per Next's Turbopack plugin guidance — Turbopack is the
    // default bundler since Next 16, and JS functions can't be passed to its
    // Rust compiler: https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-pretty-code", { theme: "github-dark" }],
    ],
  },
});

export default withMDX(nextConfig);
