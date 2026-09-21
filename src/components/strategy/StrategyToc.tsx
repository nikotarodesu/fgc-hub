'use client';

import React, { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import { TocItem } from './tocUtils';

interface StrategyTocProps {
  items: TocItem[];
}

export default function StrategyToc({ items }: StrategyTocProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 画面上部20%〜40%の領域に入っている見出しをアクティブ判定
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* モバイル用開閉式目次（lg未満で表示） */}
      <div className="lg:hidden mb-8">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsOpenMobile((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 text-left font-bold text-sm text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 transition-colors"
            aria-expanded={isOpenMobile}
          >
            <span className="flex items-center gap-2">
              <List className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>目次（全{items.length}項目）</span>
            </span>
            {isOpenMobile ? (
              <ChevronUp className="w-4 h-4 text-neutral-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            )}
          </button>

          {isOpenMobile && (
            <nav
              aria-label="モバイル目次"
              className="px-4 py-3 border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900"
            >
              <ul className="space-y-2 text-sm">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className={item.level === 3 ? 'pl-4 border-l border-neutral-200 dark:border-neutral-800' : ''}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpenMobile(false)}
                      className={`block py-1 transition-colors leading-snug ${
                        activeId === item.id
                          ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* PC用サイドバー固定追従目次（lg以上で表示） */}
      <aside
        aria-label="ページ内目次"
        className="hidden lg:block w-64 shrink-0"
      >
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xs">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <List className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>目次</span>
          </div>
          <ul className="space-y-1.5 text-xs">
            {items.map((item) => (
              <li
                key={item.id}
                className={item.level === 3 ? 'pl-3 border-l border-neutral-200 dark:border-neutral-800' : ''}
              >
                <a
                  href={`#${item.id}`}
                  className={`block py-1 transition-colors leading-relaxed line-clamp-2 ${
                    activeId === item.id
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50/60 dark:bg-cyan-950/40 -mx-1.5 px-1.5 rounded'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
