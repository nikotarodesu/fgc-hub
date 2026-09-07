import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "にこ太郎の格ゲーLAB | スト6徹底攻略 & 格ゲー共通上達論",
  description: "全キャラ1800MR以上の筆者「にこ太郎」によるストリートファイター6攻略・実戦添削・共通上達論メディア。note有料記事からの公式移行プラットフォーム（nikotaro.com）。",
  metadataBase: new URL("https://nikotaro.com"),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "にこ太郎の格ゲーLAB",
    description: "全キャラ1800MR以上の筆者「にこ太郎」による実践的勝率直結メソッド。",
    url: "https://nikotaro.com",
    siteName: "にこ太郎の格ゲーLAB",
    images: [
      {
        url: "/icon.png",
        width: 500,
        height: 500,
        alt: "にこ太郎の格ゲーLAB アイコン",
      },
    ],
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
      <body className="min-h-full flex flex-col bg-[#f0f9fb] text-neutral-900 selection:bg-[#00a3c4] selection:text-white">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
