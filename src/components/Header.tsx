'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header
      className={`${
        isHome
          ? 'sticky top-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md'
          : 'relative bg-white dark:bg-neutral-950'
      } w-full border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
        <div className="flex items-center justify-between h-14 gap-2 w-full">
          {/* ブランドロゴ */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-xs group-hover:scale-105 transition-transform bg-neutral-100 dark:bg-neutral-800 shrink-0">
              <Image
                src="/icon.png"
                alt="にこ太郎 アイコン"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-pixel font-bold text-xs sm:text-lg tracking-tight sm:tracking-wider text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors truncate block">
                  にこ太郎の格ゲーLAB
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-neutral-400 dark:text-neutral-500 font-medium tracking-wide truncate">
                全キャラ1800MR+ スト6攻略メディア
              </p>
            </div>
          </Link>

          {/* ナビゲーション（アイコンを廃止し、視認性と品格の高いタイポグラフィに統一） */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300 shrink-0">
            <Link
              href="/sf6"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>スト6攻略DB</span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded">
                TOOL
              </span>
            </Link>
            <Link
              href="/?game=sf6"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              スト6攻略記事
            </Link>
            <Link
              href="/?game=general"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              格ゲー共通上達論
            </Link>
          </nav>

          {/* 右側アクション */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <ThemeToggle />
            <Link
              href="/membership"
              className="inline-flex items-center justify-center px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 transition-colors shadow-xs shrink-0 whitespace-nowrap"
            >
              <span className="sm:hidden">マガジン</span>
              <span className="hidden sm:inline">月額マガジン</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
