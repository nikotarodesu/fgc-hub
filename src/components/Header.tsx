'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Crown,
  User as UserIcon,
  BookOpen,
  Gamepad2,
  Menu,
  X,
  Home,
  Sparkles,
  Sun,
  Moon,
  Type,
  ChevronRight,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import FontSizeToggle from './FontSizeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { trackDeviceEntryClick } from '@/lib/analytics';

export default function Header() {
  const pathname = usePathname();
  const { user, isPremium } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  useEffect(() => {
    setMounted(true);
  }, []);

  // ルート遷移時にメニューを自動で閉じる
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // ESCキーでメニューを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // メニュー展開時の背景スクロール抑制
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // 現在のフォントサイズを取得・同期
  useEffect(() => {
    const syncFontSize = () => {
      const saved = localStorage.getItem('fgc_font_size') as 'normal' | 'large' | 'xlarge' | null;
      if (saved && (saved === 'normal' || saved === 'large' || saved === 'xlarge')) {
        setCurrentFontSize(saved);
      }
    };
    syncFontSize();
    window.addEventListener('storage', syncFontSize);
    return () => window.removeEventListener('storage', syncFontSize);
  }, [isMobileMenuOpen]);

  const handleSetFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setCurrentFontSize(size);
    document.documentElement.setAttribute('data-font-size', size);
    document.documentElement.style.fontSize = '';
    try {
      localStorage.setItem('fgc_font_size', size);
    } catch {}
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md w-full border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 w-full">
        <div className="flex items-center justify-between min-h-[56px] py-1.5 sm:py-2 gap-2 w-full">
          {/* 左側：ブランドロゴ ＆ サイト名（可変幅・2行折り返し許容） */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1 mr-1">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-2xs group-hover:scale-105 transition-transform bg-neutral-100 dark:bg-neutral-800 shrink-0">
              <Image
                src="/icon.png"
                alt="にこ太郎 アイコン"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-pixel font-bold text-xs sm:text-base md:text-lg tracking-tight text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors leading-tight break-words block">
                にこ太郎の格ゲーLAB
              </span>
              <p className="hidden sm:block text-[10px] text-neutral-400 dark:text-neutral-500 font-medium tracking-wide truncate">
                全キャラ1800MR+ スト6攻略メディア
              </p>
            </div>
          </Link>

          {/* 右側：PC用ナビゲーション（md以上で横並び展開） */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
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
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
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
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${
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
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all shadow-xs shrink-0 whitespace-nowrap"
                title="プレミアム会員マイページ"
              >
                <Crown className="w-3.5 h-3.5 fill-current text-amber-100" />
                <span>マイページ</span>
              </Link>
            ) : user ? (
              <Link
                href="/account/subscription"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs shrink-0 whitespace-nowrap"
                title="マイページ・契約管理"
              >
                <UserIcon className="w-3.5 h-3.5 text-neutral-500" />
                <span>マイページ</span>
              </Link>
            ) : (
              <Link
                href="/membership"
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 transition-colors shadow-xs shrink-0 whitespace-nowrap"
              >
                <span>プレミアム会員</span>
              </Link>
            )}
          </nav>

          {/* 右側：スマホ用メニューボタン（44px以上タップ領域・ラベル付き） */}
          <div className="md:hidden flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex items-center justify-center gap-1 px-2.5 py-2 min-h-[44px] min-w-[44px] rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors text-xs font-bold shadow-2xs"
              aria-label="メニューを開く"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>メニュー</span>
            </button>
          </div>
        </div>
      </div>

      {/* スマホ用 ドロワーモーダルメニュー（createPortalでbody直下に展開してbackdrop-filterの包含ブロック制約を回避） */}
      {mounted && isMobileMenuOpen && createPortal(
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-[9999] md:hidden flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="ナビゲーションメニュー"
        >
          {/* 背景オーバーレイ */}
          <div
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* ドロワーパネル */}
          <div className="relative w-full max-w-[320px] h-screen h-[100dvh] bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xl flex flex-col z-10 border-l border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-right duration-200">
            {/* ドロワーヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 min-h-[56px]">
              <div className="flex items-center gap-2">
                <Image
                  src="/icon.png"
                  alt="にこ太郎"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="font-pixel font-bold text-sm">メニュー</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="メニューを閉じる"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ドロワー本体（スクロール対応） */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
              {/* 主要ナビゲーション */}
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-2 mb-1">
                  ページ案内
                </div>

                <Link
                  href="/"
                  className={`flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-xl font-medium transition-colors ${
                    pathname === '/'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>記事一覧（ホーム）</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>

                <Link
                  href="/sf6/strategy/handan-wo-herasu-renshu"
                  className={`flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-xl font-medium transition-colors ${
                    pathname?.startsWith('/sf6/strategy')
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>共通技術ガイド</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>

                <Link
                  href="/sf6/devices"
                  onClick={() =>
                    trackDeviceEntryClick({
                      location: 'mobile_menu',
                      sourcePage: pathname || '',
                      destination: '/sf6/devices',
                      category: 'all',
                    })
                  }
                  className={`flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-xl font-medium transition-colors ${
                    pathname?.startsWith('/sf6/devices')
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Gamepad2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>おすすめデバイス</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>

                <Link
                  href="/glossary"
                  className={`flex items-center justify-between px-3 py-2.5 min-h-[44px] rounded-xl font-medium transition-colors ${
                    pathname === '/glossary'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>格ゲー用語解説</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              </div>

              {/* プレミアム・会員エリア */}
              <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-2">
                  会員プラン
                </div>

                {isPremium ? (
                  <Link
                    href="/account/subscription"
                    className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 fill-current text-amber-100" />
                      <span>プレミアム マイページ</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : user ? (
                  <Link
                    href="/account/subscription"
                    className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold"
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-neutral-500" />
                      <span>マイページ・契約管理</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                ) : (
                  <Link
                    href="/membership"
                    className="flex flex-col gap-1 p-3.5 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white border border-neutral-700 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-amber-300">
                        <Crown className="w-4 h-4 fill-current" />
                        <span>プレミアム会員案内</span>
                      </span>
                      <span className="text-[10px] font-bold bg-cyan-400/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-400/30">
                        月額 ¥980
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      全攻略記事・実戦添削・リーサルツールが読み放題
                    </p>
                  </Link>
                )}
              </div>

              {/* 表示設定（文字サイズ・テーマ） */}
              <div className="space-y-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-2">
                  表示設定
                </div>

                {/* 文字サイズ設定 */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <Type className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>文字サイズ</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['normal', 'large', 'xlarge'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSetFontSize(size)}
                        className={`py-2 px-2 text-xs font-bold rounded-lg min-h-[44px] transition-colors ${
                          currentFontSize === size
                            ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                            : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600'
                        }`}
                      >
                        {size === 'normal' ? '標準' : size === 'large' ? '大' : '特大'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* テーマ切替 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <Sun className="w-4 h-4 text-amber-500 dark:hidden" />
                    <Moon className="w-4 h-4 text-cyan-400 hidden dark:block" />
                    <span>テーマ切替</span>
                  </div>
                  <div className="min-h-[44px] min-w-[44px] flex items-center justify-center">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
