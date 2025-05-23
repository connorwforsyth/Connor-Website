import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Texture from "@/components/BackgroundTexture";
import { CSPostHogProvider } from "@/lib/providers";
import { Metadata } from "next";
import siteMetadata from "@/config/site-metadata";
import AccessForm from "@/components/access-form";
import { getSession } from "@/server-actions/actions";

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
  const session = await getSession();

  return (
    <html className="scroll-smooth" lang="en">
      <body className={`relative bg-zinc-100 antialiased dark:bg-zinc-900`}>
        <Texture />
        <ThemeProvider>
          <CSPostHogProvider>
            {!session.isLoggedIn ? (
              <div className="flex h-svh items-center justify-center">
                <div className="w-full max-w-md p-4">
                  <AccessForm />
                </div>
              </div>
            ) : (
              <div>{children}</div>
            )}
          </CSPostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
