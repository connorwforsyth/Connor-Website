import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import Texture from "@/components/BackgroundTexture";
import Footer from "@/components/Footer";
import Offline from "@/components/Offline";
import localFont from "next/font/local";

const KAG300 = localFont({
  src: [
    {
      path: "./fonts/KynetonArtGrotesqueVF.ttf",
      weight: "275",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--kag-300",
});

const KAG500 = localFont({
  src: [
    {
      path: "./fonts/KynetonArtGrotesqueVF.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--kag-500",
});

const RodneyLight = localFont({
  src: "./fonts/Rodney-LightItalic.woff",
  display: "swap",
  variable: "--font-rodney-light",
});

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
      <body
        className={`relative antialiased  ${RodneyLight.variable} ${inter.className} ${KAG500.variable}`}
      >
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
