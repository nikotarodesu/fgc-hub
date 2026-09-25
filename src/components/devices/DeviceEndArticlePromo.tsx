'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Monitor, Keyboard, Laptop, Gamepad2, ChevronRight } from 'lucide-react';
import { trackDeviceEntryView, trackDeviceEntryClick } from '@/lib/analytics';

interface DeviceEndArticlePromoProps {
  sourcePage: string;
}

export default function DeviceEndArticlePromo({ sourcePage }: DeviceEndArticlePromoProps) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      trackDeviceEntryView({
        location: 'article_end',
        sourcePage,
        destination: '/sf6/devices',
      });
    }
  }, [sourcePage]);

  const handleClick = (category?: string) => {
    trackDeviceEntryClick({
      location: 'article_end',
      sourcePage,
      destination: '/sf6/devices',
      category: category || 'all',
    });
  };

  return (
    <section
      aria-label="スト6のデバイス・プレイ環境ガイド"
      className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-neutral-900/90 dark:via-neutral-900 dark:to-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 shadow-2xs"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60">
              無料ガイド
            </span>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
              スト6のデバイス・PC環境を選ぶ
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            キーボード・レバーレス・モニター・PCの選び方をまとめています。
          </p>
          <div className="flex items-center gap-3 pt-1 text-[11px] text-neutral-500 dark:text-neutral-400 flex-wrap">
            <Link
              href="/sf6/devices/keyboard"
              onClick={() => handleClick('keyboard')}
              className="inline-flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5 text-neutral-400" />
              <span className="underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-2">キーボード</span>
            </Link>
            <span>•</span>
            <Link
              href="/sf6/devices/leverless"
              onClick={() => handleClick('leverless')}
              className="inline-flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-neutral-400" />
              <span className="underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-2">レバーレス</span>
            </Link>
            <span>•</span>
            <Link
              href="/sf6/devices/gaming-pc"
              onClick={() => handleClick('gaming-pc')}
              className="inline-flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Laptop className="w-3.5 h-3.5 text-neutral-400" />
              <span className="underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-2">ゲーミングPC</span>
            </Link>
            <span>•</span>
            <Link
              href="/sf6/devices/monitor"
              onClick={() => handleClick('monitor')}
              className="inline-flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Monitor className="w-3.5 h-3.5 text-neutral-400" />
              <span className="underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-2">モニター</span>
            </Link>
          </div>
        </div>

        <Link
          href="/sf6/devices"
          onClick={() => handleClick('hub')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-xs font-bold transition-colors shadow-xs shrink-0 whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <span>デバイスガイドを見る</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
