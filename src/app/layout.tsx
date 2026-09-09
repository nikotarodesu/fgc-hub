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
  themeColor: '#00a3c4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-neutral-900 selection:bg-neutral-900 selection:text-white antialiased w-full max-w-full overflow-x-hidden">
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
