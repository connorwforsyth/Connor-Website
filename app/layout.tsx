import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import Texture from "@/components/BackgroundTexture";
import Footer from "@/components/Footer";
import Offline from "@/components/Offline";
import { CSPostHogProvider } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  metadataBase: new URL("https://connorforsyth.co"),
  title: "Connor Forsyth",
  description: "Design Technologist currently based in Sydney, Australia.",
  openGraph: {
    images: "/opengraph-image.jpg",
    type: "website",
    url: "https://connorforsyth.co",
    title: "Connor Forsyth",
    description: "Design Technologist currently based in Sydney, Australia.",
    siteName: "Connor Forsyth",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/KynetonArtGrotesqueVF.ttf"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Rodney-LightItalic.woff"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`relative bg-zinc-100 antialiased dark:bg-zinc-900`}>
        <Offline />
        <div className="blur"></div>
        <Texture />

        <Providers>
          <CSPostHogProvider>
            <div className="flex min-h-screen flex-col">
              <main className="flex-grow px-4 pb-24 pt-24 md:pt-36">
                {children}
              </main>
              <Footer />
            </div>
            <Analytics />
          </CSPostHogProvider>
        </Providers>
      </body>
    </html>
  );
}
