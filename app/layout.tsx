import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import Texture from "@/components/BackgroundTexture";
import Footer from "@/components/Footer";
import Offline from "@/components/Offline";
import localFont from "next/font/local";

// const KAG300 = localFont({
//   src: [
//     {
//       path: "./fonts/KynetonArtGrotesqueVF.ttf",
//       weight: "275",
//       style: "normal",
//     },
//   ],
//   display: "swap",
//   variable: "--kag-300",
// });

// const KAG500 = localFont({
//   src: [
//     {
//       path: "./fonts/KynetonArtGrotesqueVF.ttf",
//       weight: "500",
//       style: "normal",
//     },
//   ],
//   display: "swap",
//   variable: "--kag-500",
// });

// const RodneyLight = localFont({
//   src: "./fonts/Rodney-LightItalic.woff",
//   display: "swap",
//   variable: "--font-rodney-light",
// });

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Connor Forsyth",
  description: "Designer and Developer based in Australia",
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
          <div className="flex min-h-screen flex-col">
            <main className="flex-grow px-4 pb-16 pt-24 md:pt-36">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
