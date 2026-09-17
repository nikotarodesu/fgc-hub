import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...constructMetadata(),
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('fgc_theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 antialiased w-full max-w-full overflow-x-hidden">
        <Header />
        <div className="flex-1 w-full max-w-full min-w-0">
          {children}
        </div>
        <Footer />
        {/* Google Analytics (GA4) */}
        <GoogleAnalytics gaId="G-844CKYZJ9P" />
      </body>
    </html>
  );
}
