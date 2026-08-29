import "@/styles/cv-globals.css";
import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import siteMetadata from "@/config/site-metadata";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: {
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.siteUrl}/api/og/?title=${siteMetadata.title}`,
      },
    ],
    siteName: siteMetadata.title,
    title: siteMetadata.title,
    type: "website",
    url: siteMetadata.siteUrl,
  },
  title: siteMetadata.title,
};

export default async function Layout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className="relative flex w-full flex-col gap-8 p-4 py-24 font-kag antialiased *:flex *:flex-col *:gap-8 [&_*:not(h1,span)]:text-pretty [&_a]:underline [&_h2]:border-border [&_h2]:border-t [&_h2]:py-6 [&_h2]:font-medium [&_h2]:font-mono [&_h2]:text-muted-foreground [&_h2]:text-xs [&_h2]:uppercase [&_i]:not-italic">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
