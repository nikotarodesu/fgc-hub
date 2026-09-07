'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Flame, BookOpen, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-sky-100 text-neutral-900 shadow-xs">
      {/* 爽やかな告知アナウンスバー */}
      <div className="bg-[#00a3c4] text-white text-[11px] py-1.5 px-4 text-center font-bold flex items-center justify-center gap-2">
        <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] tracking-wide">nikotaro.com</span>
        <span>noteから「にこ太郎の格ゲーLAB」へ移行中！動画付きリプレイ添削＆コンボ攻略を配信中</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ：添付された手描きにこちゃんアイコンを使用！ */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-900 shadow-sm group-hover:scale-105 transition-transform bg-[#00a3c4]">
              <Image
                src="/icon.png"
                alt="にこ太郎 アイコン"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-neutral-900 group-hover:text-[#00a3c4] transition-colors">
                  にこ太郎の格ゲーLAB
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 font-semibold">
                全キャラ1800MR以上のスト6攻略
              </p>
            </div>
          </Link>

          {/* ナビゲーション */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-neutral-700">
            <Link href="/?game=sf6" className="hover:text-[#00a3c4] transition-colors flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>スト6攻略</span>
            </Link>
            <Link href="/?game=general" className="hover:text-[#00a3c4] transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-500" />
              <span>共通上達論</span>
            </Link>
          </nav>

          {/* 右側アクション */}
          <div className="flex items-center gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black bg-[#00a3c4] hover:bg-[#008ba8] text-white shadow-md shadow-sky-500/20 transition-all hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>月額マガジン</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
