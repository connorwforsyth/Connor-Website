import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

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
    ];
  },
};

const withMDX = createMDX({
  options: {
    // remark-frontmatter makes the mdx compiler recognize the leading
    // --- yaml --- block as frontmatter instead of rendering it as text.
    // The frontmatter values themselves are read separately via gray-matter
    // in lib/content.ts.
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark" }]],
  },
});

export default withMDX(nextConfig);
