import "@/styles/cv.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import siteMetadata from "@/config/site-metadata";
import { DevAnnotations } from "./_components/dev-annotations";

const inter = Inter({ display: "swap", subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} cv-body antialiased`}>
        {children}
        <DevAnnotations />
        <Analytics />
      </body>
    </html>
  );
}
