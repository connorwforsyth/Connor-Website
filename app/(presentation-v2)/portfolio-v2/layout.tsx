import "@/styles/globals.css";

import type { Metadata } from "next";
import AccessForm from "@/components/access-form";
import { Analytics } from "@/components/analytics";
import Texture from "@/components/BackgroundTexture";
import { ThemeProvider } from "@/components/theme-provider";
import siteMetadata from "@/config/site-metadata";
import { getSession } from "@/server-actions/actions";

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
  const session = await getSession();

  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body className={"relative bg-background antialiased"}>
        <Texture />
        <ThemeProvider>
          {session.isLoggedIn ? (
            <div>{children}</div>
          ) : (
            <div className="flex h-svh items-center justify-center">
              <div className="w-full max-w-md p-4">
                <AccessForm />
              </div>
            </div>
          )}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
