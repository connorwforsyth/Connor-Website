import Link from "next/link";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import Texture from "@/components/BackgroundTexture";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`relative antialiased ${inter.className}`}>
        <Texture />
        <div
          className="absolute -z-50 h-full w-full"
          style={{
            backdropFilter: "url(#grainy)",
          }}
        ></div>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <div className="mx-auto flex max-w-2xl flex-grow flex-col justify-between px-4 py-10">
              <main className="">{children}</main>
            </div>
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
