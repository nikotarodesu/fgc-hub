import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FGC LAB | スト6徹底攻略 & 格ゲー共通上達論（将来作スト7対応）",
  description: "ストリートファイター6のMR2000攻略、フレーム完璧なセットプレイ、確定反撃、格ゲー共通上達論を発信する独自メディア。note有料記事からの移行公式プラットフォーム。",
  keywords: ["スト6", "ストリートファイター6", "豪鬼", "ケン", "MR2000", "攻略", "有料記事", "格ゲー", "スト7"],
  openGraph: {
    title: "FGC LAB | スト6徹底攻略 & 格ゲー共通上達論",
    description: "最高MR2080到達者による実践的勝率直結メソッド。note有料記事1,000部突破の実績。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
