import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "にこ太郎の格ゲーLAB | スト6徹底攻略 & 格ゲー共通上達論",
  description: "全キャラ1800MR以上の筆者「にこ太郎」によるストリートファイター6攻略・実戦添削・共通上達論メディア。キャラ調整・アプデ追記最速対応。note有料記事からの公式移行プラットフォーム（nikotaro.com）。",
  metadataBase: new URL("https://nikotaro.com"),
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: 'WpGRRdF0HHY0wFdMrd-s_AfzySf7Ge10orooBjtflP8',
  },
  openGraph: {
    title: "にこ太郎の格ゲーLAB",
    description: "全キャラ1800MR以上の筆者「にこ太郎」による実践的勝率直結メソッド。アップデート追記最速対応。",
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
        {/* Google Analytics (GA4) */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
