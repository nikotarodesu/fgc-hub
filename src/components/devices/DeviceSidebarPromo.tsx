'use client';

import React from 'react';
import Link from 'next/link';
import { Gamepad2, ChevronRight } from 'lucide-react';
import { trackDeviceEntryClick } from '@/lib/analytics';

interface DeviceSidebarPromoProps {
  sourcePage: string;
}

export default function DeviceSidebarPromo({ sourcePage }: DeviceSidebarPromoProps) {
  const handleClick = () => {
    trackDeviceEntryClick({
      location: 'sidebar',
      sourcePage,
      destination: '/sf6/devices',
      category: 'all',
    });
  };

  return (
    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
      <Link
        href="/sf6/devices"
        onClick={handleClick}
        className="group block p-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800/60 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 transition-colors"
      >
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <Gamepad2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 truncate">
              デバイス・PC環境
            </span>
          </div>
          <span className="inline-flex items-center text-[10px] font-bold text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 shrink-0">
            <span>選び方を見る</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    </div>
  );
}
