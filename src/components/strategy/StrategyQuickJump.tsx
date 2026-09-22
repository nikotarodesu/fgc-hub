'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Crown, Sparkles, X } from 'lucide-react';
import ArticleQuickJump, { QuickJumpSection } from '@/components/ArticleQuickJump';
import { useAuth } from '@/contexts/AuthContext';

interface StrategyQuickJumpProps {
  sections: QuickJumpSection[];
  slug: string;
}

export default function StrategyQuickJump({ sections, slug }: StrategyQuickJumpProps) {
  const { isPremium } = useAuth();
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sections[0]?.id || ''
  );
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showBars, setShowBars] = useState(false);

  // お気に入りのローカルストレージ同期（プレミアム会員用）
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`fgc_strategy_bookmarks_${slug}`);
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [slug]);

  // スクロール検知：現在のアクティブセクションとバーの表示切り替え
  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // ページ上部（ヘッダー付近）ではバーを隠し、スクロールしたら表示
      if (scrollY > 200) {
        setShowBars(true);
      } else {
        setShowBars(false);
      }

      // 現在画面内にあるセクションを検出
      const sectionElements = sections
        .map((sec) => ({ id: sec.id, el: document.getElementById(sec.id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (sectionElements.length === 0) return;

      const triggerOffset = 180; // ヘッダー・追従バー考慮オフセット
      let currentId = sectionElements[0].id;

      for (let i = 0; i < sectionElements.length; i++) {
        const rect = sectionElements[i].el.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          currentId = sectionElements[i].id;
        } else {
          break;
        }
      }

      setActiveSectionId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // セクションジャンプ処理
  const handleJumpToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // 固定ヘッダー（h-14）および上部追従バー考慮
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // お気に入りトグル処理（プレミアム限定ガード）
  const handleToggleBookmark = (id: string) => {
    if (!isPremium) {
      // 非会員の場合はプレミアム案内モーダルを表示
      setShowPremiumModal(true);
      return;
    }

    // プレミアム会員はお気に入りを保存/解除
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(`fgc_strategy_bookmarks_${slug}`, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <>
      <ArticleQuickJump
        sections={sections}
        activeSectionId={activeSectionId}
        bookmarks={bookmarks}
        onToggleBookmark={handleToggleBookmark}
        onJumpToSection={handleJumpToSection}
        enableBookmarks={true}
        showBars={showBars}
      />

      {/* プレミアム会員限定機能案内モーダル */}
      {showPremiumModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowPremiumModal(false)}
        >
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3 text-amber-600 dark:text-amber-400">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-500 block">
                  Premium Feature
                </span>
                <h3 className="text-base font-black text-neutral-900 dark:text-white">
                  お気に入り登録はプレミアム限定
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
              気になるセクションや重要ポイントをワンタップで保存し、トレモや対戦の合間に即座に呼び出せる便利機能です。
              <br className="hidden sm:inline" />
              プレミアム会員になると、完全攻略記事の閲覧やお気に入り即時ジャンプなど、すべての学習支援機能が解放されます。
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <Link
                href="/membership"
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-neutral-950 font-black text-xs sm:text-sm text-center shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>プレミアム詳細を見る</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowPremiumModal(false)}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400 font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
