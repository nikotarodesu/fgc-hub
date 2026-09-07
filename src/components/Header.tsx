'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Flame, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 text-neutral-900 transition-all">
      {/* 控えめで上質な告知バー */}
      <div className="bg-neutral-900 text-white text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] text-neutral-300 font-bold">INFO</span>
        <span>noteから公式サイトへ移行中。フレーム表・コンボ解説付きの完全版を更新しています</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-black text-sm group-hover:bg-neutral-800 transition-colors">
              FG
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-neutral-900">
                FGC LAB
              </span>
              <span className="text-[10px] text-neutral-500 font-medium ml-1.5 hidden sm:inline">
                スト6 & スト7 格ゲー攻略
              </span>
            </div>
          </Link>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <Link href="/?game=sf6" className="hover:text-neutral-900 transition-colors flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-neutral-400" />
              <span>スト6攻略</span>
            </Link>
            <Link href="/?game=general" className="hover:text-neutral-900 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-neutral-400" />
              <span>共通上達論</span>
            </Link>
            <Link href="/?game=sf7" className="hover:text-neutral-900 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-neutral-400" />
              <span>スト7展望</span>
            </Link>
          </nav>

          {/* 右側アクション */}
          <div className="flex items-center gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
              <span>月額マガジン</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-700">
              niko
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
