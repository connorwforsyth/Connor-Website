import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import siteMetadata from "@/config/site-metadata";

const inter = Inter({ subsets: ["latin"] });

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

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${inter.className} relative flex w-full flex-col gap-8 p-4 py-24 text-sm antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
