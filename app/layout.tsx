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

          <div className="min-h-screen max-w-2xl mx-auto py-10 px-4 flex flex-col justify-between">
            <header className="flex w-full justify-between items-center"></header>
            <main className="pt-12 pb-12">{children}</main>
          </div>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
