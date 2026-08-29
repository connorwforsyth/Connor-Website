import "@/styles/globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/analytics";
import Texture from "@/components/BackgroundTexture";
import Footer from "@/components/Footer";
import Offline from "@/components/Offline";
import { ThemeProvider } from "@/components/theme-provider";
import siteMetadata from "@/config/site-metadata";
import { getOgImageUrl } from "@/lib/og";

interface RootLayoutProps {
  children: React.ReactNode;
}

const jetbrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: {
    description: siteMetadata.description,
    images: {
      url: getOgImageUrl({
        description: siteMetadata.description,
        title: siteMetadata.title,
        type: "Website",
      }),
    },
    siteName: siteMetadata.title,
    title: siteMetadata.title,
    type: "website",
    url: siteMetadata.siteUrl,
  },
  title: siteMetadata.title,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className={`scroll-p-32 scroll-smooth ${jetbrainsMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className={"relative bg-background antialiased"}>
        <Offline />
        <div className="prog-blur" />
        <Texture />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow px-4 pt-24 pb-24 md:pt-36">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
