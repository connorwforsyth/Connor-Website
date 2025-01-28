import "@/styles/cv-globals.css";

import { CSPostHogProvider } from "@/lib/providers";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className="relative  flex w-full flex-col gap-8 p-4 py-24 font-kag antialiased *:flex *:flex-col *:gap-8 lg:p-24 [&_*]:text-pretty [&_a]:underline [&_h2]:border-t [&_h2]:border-neutral-200 [&_h2]:py-6 [&_h2]:font-mono [&_h2]:text-xs [&_h2]:font-medium [&_h2]:uppercase [&_h2]:text-neutral-700 [&_i]:not-italic">
        <CSPostHogProvider>{children}</CSPostHogProvider>
      </body>
    </html>
  );
}
