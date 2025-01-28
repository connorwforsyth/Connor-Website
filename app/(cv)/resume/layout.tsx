import styles from "./cv.module.css";

import { CSPostHogProvider } from "@/lib/providers";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: RootLayoutProps) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${styles.body} relative bg-zinc-100 font-kag antialiased dark:bg-zinc-900`}
      >
        <CSPostHogProvider>{children}</CSPostHogProvider>
      </body>
    </html>
  );
}
