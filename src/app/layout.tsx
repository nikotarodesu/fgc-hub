import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FGC LAB | 格闘ゲーム攻略メディア（スト6・スト7対応）",
  description: "最高MR2080到達者によるストリートファイター6攻略・普遍的格ゲー上達理論・スト7展望。note有料記事からの公式移行メディア。",
  openGraph: {
    title: "FGC LAB | 格闘ゲーム攻略メディア",
    description: "最高MR2080到達者による実践的勝率直結メソッド。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
