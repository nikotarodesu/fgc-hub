'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* 控えめでスマートなアナウンスバー */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-white/15 text-white px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide">
          OFFICIAL
        </span>
        <span>にこ太郎の格ゲーLAB：スト6実戦攻略＆リプレイ添削を配信中</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ブランドロゴ */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-xs group-hover:scale-105 transition-transform bg-neutral-100">
              <Image
                src="/icon.png"
                alt="にこ太郎 アイコン"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  にこ太郎の格ゲーLAB
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium tracking-wide">
                全キャラ1800MR+ スト6攻略メディア
              </p>
            </div>
          </Link>

          {/* ナビゲーション（アイコンを廃止し、視認性と品格の高いタイポグラフィに統一） */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
            <Link
              href="/sf6"
              className="hover:text-neutral-950 transition-colors flex items-center gap-1.5"
            >
              <span>スト6攻略DB</span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-neutral-100 text-neutral-600 rounded">
                TOOL
              </span>
            </Link>
            <Link
              href="/?game=sf6"
              className="hover:text-neutral-950 transition-colors"
            >
              スト6攻略記事
            </Link>
            <Link
              href="/?game=general"
              className="hover:text-neutral-950 transition-colors"
            >
              格ゲー共通上達論
            </Link>
          </nav>

          {/* 右側アクション */}
          <div className="flex items-center gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors shadow-xs"
            >
              月額マガジン
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
