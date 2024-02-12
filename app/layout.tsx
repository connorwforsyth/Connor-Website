import Link from "next/link";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import Texture from "@/components/BackgroundTexture";
import CfIcon from "@/components/CFIcon";
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
      <body
        style={{
          backdropFilter: "url(#grainy)",
        }}
        className={`antialiased ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Texture />
          <div className="flex min-h-screen flex-col">
            <div className="mx-auto flex max-w-2xl flex-grow flex-col justify-between px-4 py-10">
              <main className="flex-grow pb-12 pt-12">{children}</main>
            </div>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
