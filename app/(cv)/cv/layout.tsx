import "@/styles/cv.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@/components/analytics";
import siteMetadata from "@/config/site-metadata";
import { DevAnnotations } from "./_components/dev-annotations";

const inter = Inter({ display: "swap", subsets: ["latin"] });

// `next dev` is also what renders the CV to PDF and what Playwright drives, so
// NODE_ENV alone cannot tell interactive development apart from an automated
// capture. The annotation toolbar is a fixed-position overlay, which Chromium
// repeats on every page of the printed PDF. Both automation paths set
// PLAYWRIGHT, and this check has to live in the server layout because a client
// component only ever sees NEXT_PUBLIC_* variables.
const showDevAnnotations =
  process.env.NODE_ENV === "development" && process.env.PLAYWRIGHT !== "true";

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
        {showDevAnnotations && <DevAnnotations />}
        <Analytics />
      </body>
    </html>
  );
}
