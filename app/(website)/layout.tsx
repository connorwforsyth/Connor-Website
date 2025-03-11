import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Texture from "@/components/BackgroundTexture";
import Footer from "@/components/Footer";
import Offline from "@/components/Offline";
import { CSPostHogProvider } from "@/lib/providers";
import { Metadata } from "next";
import siteMetadata from "@/config/site-metadata";

interface RootLayoutProps {
  children: React.ReactNode;
}

// export const metadata: Metadata = {
//   title: {
//     default: siteMetadata.title,
//     template: `%s | ${siteMetadata.title}`,
//   },
//   metadataBase: new URL(siteMetadata.siteUrl),
//   description: siteMetadata.description,
//   keywords: [
//     "Design",
//     "Product Design",
//     "Service Design",
//     "Connor Forsyth",
//     "Design Engineer",
//     "TEDx",
//     "Designit",
//   ],
//   authors: [
//     {
//       name: "Connor Forsyth",
//       url: "https://connorforsyth.co",
//     },
//   ],
//   creator: "Connor Forsyth",
//   openGraph: {
//     type: "website",
//     locale: siteMetadata.locale,
//     url: siteMetadata.siteUrl,
//     title: siteMetadata.title,
//     description: siteMetadata.description,
//     siteName: siteMetadata.title,
//     images: [
//       {
//         url: `${siteMetadata.siteUrl}api/og/?title=${siteMetadata.title}`,
//         alt: siteMetadata.title,
//       },
//     ],
//   },
// };

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
    images: {
      url: `${siteMetadata.siteUrl}/api/og/?title=${siteMetadata.title}`,
    },
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-p-32 scroll-smooth" lang="en">
      <body className={`relative bg-zinc-100 antialiased dark:bg-zinc-900`}>
        <Offline />
        <div className="prog-blur"></div>
        <Texture />
        <ThemeProvider>
          <CSPostHogProvider>
            <div className="flex min-h-screen flex-col">
              <main className="flex-grow px-4 pb-24 pt-24 md:pt-36">
                {children}
              </main>
              <Footer />
            </div>
          </CSPostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
