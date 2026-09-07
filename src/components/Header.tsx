'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, BookOpen, Sparkles, User, ShieldCheck } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: 'スト6攻略', href: '/?game=sf6', icon: Flame, badge: 'メイン' },
    { label: '共通上達論', href: '/?game=general', icon: BookOpen },
    { label: 'スト7展望室', href: '/?game=sf7', icon: Sparkles, badge: '将来' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 text-white">
      {/* 告知アナウンスバー */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-orange-600 text-xs py-1.5 px-4 text-center font-medium text-white flex items-center justify-center gap-2">
        <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">OFFICIAL</span>
        <span>noteから公式サイトへ移行中！独自ドメインでより詳細なセットプレイ・フレーム攻略を配信中</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-red-400 transition-colors">
                FGC LAB <span className="text-xs text-orange-500 font-semibold border border-orange-500/30 px-1.5 py-0.5 rounded ml-1">スト6 & 将来作</span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono">By nikotaro (最高MR2080)</p>
            </div>
          </Link>

          {/* ナビゲーション（デスクトップ） */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors"
                >
                  <Icon className="w-4 h-4 text-orange-400" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-neutral-800 text-orange-300 border border-neutral-700 px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ユーザーエリア */}
          <div className="flex items-center gap-3">
            <Link
              href="/membership"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black shadow-md shadow-orange-600/20 transition-all hover:scale-105"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>月額マガジン</span>
            </Link>
            <div className="flex items-center gap-2 border-l border-neutral-800 pl-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm font-bold text-neutral-300">
                🥋
              </div>
              <span className="text-xs text-neutral-400 hidden lg:inline">nikotaro</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
