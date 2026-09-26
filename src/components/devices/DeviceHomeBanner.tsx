'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Gamepad2, ChevronRight, Keyboard, Laptop, Monitor } from 'lucide-react';
import { trackDeviceEntryView, trackDeviceEntryClick } from '@/lib/analytics';

export default function DeviceHomeBanner() {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      trackDeviceEntryView({
        location: 'home',
        sourcePage: '/',
        destination: '/sf6/devices',
      });
    }
  }, []);

  const handleClick = (category?: string) => {
    trackDeviceEntryClick({
      location: 'home',
      sourcePage: '/',
      destination: '/sf6/devices',
      category: category || 'all',
    });
  };

  return (
    <section className="mb-6">
      <Link
        href="/sf6/devices"
        onClick={() => handleClick('hub')}
        className="group block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white shadow-xs hover:ring-2 hover:ring-cyan-500/50 transition-all border border-neutral-800"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 sm:gap-4">
          <div className="space-y-2 min-w-0 w-full flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2">
              <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-300 text-[10px] font-black border border-cyan-400/30 shrink-0">
                プレイ環境
              </span>
              <h2 className="text-sm sm:text-base font-black text-white group-hover:text-cyan-300 transition-colors leading-snug break-words">
                スト6おすすめデバイス・プレイ環境
              </h2>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed break-words">
              スト6に合うキーボード・レバーレス・モニター・PCを、用途と予算から選べます。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 text-[11px] text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <Keyboard className="w-3 h-3 text-cyan-400" />
                <span>キーボード</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Gamepad2 className="w-3 h-3 text-cyan-400" />
                <span>レバーレス</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Laptop className="w-3 h-3 text-cyan-400" />
                <span>PCスペック</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Monitor className="w-3 h-3 text-cyan-400" />
                <span>モニター</span>
              </span>
            </div>

            <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold transition-colors w-full sm:w-auto shadow-xs shrink-0">
              <span>選び方ガイドを見る</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
