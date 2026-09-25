'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Crown, User as UserIcon, BookOpen, Gamepad2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import FontSizeToggle from './FontSizeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { trackDeviceEntryClick } from '@/lib/analytics';

export default function Header() {
  const pathname = usePathname();
  const { user, isPremium } = useAuth();

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md w-full border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
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

          {/* 右側アクション */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              href="/sf6/devices"
              onClick={() =>
                trackDeviceEntryClick({
                  location: 'header',
                  sourcePage: pathname || '',
                  destination: '/sf6/devices',
                  category: 'all',
                })
              }
              className={`inline-flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
                pathname?.startsWith('/sf6/devices')
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title="スト6おすすめデバイス・プレイ環境"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>デバイス</span>
            </Link>

            <Link
              href="/glossary"
              className={`inline-flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
                pathname === '/glossary'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
              title="格ゲー用語解説・スト6攻略辞典"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>用語解説</span>
            </Link>

            <FontSizeToggle />
            <ThemeToggle />
            {isPremium ? (
              <Link
                href="/account/subscription"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all shadow-xs shrink-0 whitespace-nowrap"
                title="プレミアム会員マイページ"
              >
                <Crown className="w-3.5 h-3.5 fill-current text-amber-100" />
                <span>マイページ</span>
              </Link>
            ) : user ? (
              <Link
                href="/account/subscription"
                className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs shrink-0 whitespace-nowrap"
                title="マイページ・契約管理"
              >
                <UserIcon className="w-3.5 h-3.5 text-neutral-500" />
                <span>マイページ</span>
              </Link>
            ) : (
              <Link
                href="/membership"
                className="inline-flex items-center justify-center px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 transition-colors shadow-xs shrink-0 whitespace-nowrap"
              >
                <span className="sm:hidden">プレミアム</span>
                <span className="hidden sm:inline">プレミアム会員</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
