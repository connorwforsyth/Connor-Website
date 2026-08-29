import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: "https://us-assets.i.posthog.com/static/:path*",
        source: "/ingest/static/:path*",
      },
      {
        destination: "https://us.i.posthog.com/:path*",
        source: "/ingest/:path*",
      },
    ];
  },
  // .wgsl shader imports (vgpu). Turbopack and webpack read their own keys,
  // so both rules are needed. Note neither path validates WGSL at build
  // time — that's `bun x vgpu check <file> --require-validation`.
  turbopack: {
    rules: {
      "*.wgsl": {
        as: "*.js",
        loaders: ["@vgpu/wgsl/loader-webpack"],
      },
    },
  },
  webpack(config) {
    config.module ??= {};
    config.module.rules ??= [];
    config.module.rules.push({
      loader: "@vgpu/wgsl/loader-webpack",
      test: /\.wgsl$/,
    });
    return config;
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      "rehype-slug",
      [
        "rehype-pretty-code",
        {
          keepBackground: false,
          theme: {
            dark: "github-dark-high-contrast",
            light: "github-light-high-contrast",
          },
        },
      ],
    ],
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
  },
});

export default withMDX(nextConfig);
