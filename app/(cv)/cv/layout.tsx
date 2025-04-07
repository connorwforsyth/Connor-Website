import "@/styles/cv-globals.css";
import { Metadata } from "next";
import { CSPostHogProvider } from "@/lib/providers";
import siteMetadata from "@/config/site-metadata";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: "website",
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/api/og/?title=${siteMetadata.title}`,
      },
    ],
  },
};

export default async function Layout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className="[&_*:not(h1, span)]:text-pretty relative flex w-full flex-col gap-8 p-4 py-24 font-kag antialiased *:flex *:flex-col *:gap-8  [&_a]:underline [&_h2]:border-t [&_h2]:border-neutral-200 [&_h2]:py-6 [&_h2]:font-mono [&_h2]:text-xs [&_h2]:font-medium [&_h2]:uppercase [&_h2]:text-neutral-700 [&_i]:not-italic">
        <CSPostHogProvider>{children}</CSPostHogProvider>
      </body>
    </html>
  );
}
