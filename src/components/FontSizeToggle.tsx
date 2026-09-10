'use client';

import { useState, useEffect, useRef } from 'react';
import { Type, Check } from 'lucide-react';

export type FontSizeOption = 'normal' | 'large' | 'xlarge';

const FONT_SIZE_MAP: Record<FontSizeOption, { label: string; scaleText: string; htmlFontSize: string }> = {
  normal: { label: '標準', scaleText: '100%', htmlFontSize: '100%' },
  large: { label: '大', scaleText: '112%', htmlFontSize: '112.5%' },
  xlarge: { label: '特大', scaleText: '125%', htmlFontSize: '125%' },
};

export default function FontSizeToggle() {
  const [fontSize, setFontSize] = useState<FontSizeOption>('normal');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('fgc_font_size') as FontSizeOption | null;
    const initial: FontSizeOption = saved && FONT_SIZE_MAP[saved] ? saved : 'normal';
    setFontSize(initial);
    applyFontSize(initial);
  }, []);

  const applyFontSize = (size: FontSizeOption) => {
    const config = FONT_SIZE_MAP[size] || FONT_SIZE_MAP.normal;
    document.documentElement.style.fontSize = config.htmlFontSize;
    document.documentElement.setAttribute('data-font-size', size);
  };

  const handleSelectSize = (size: FontSizeOption) => {
    setFontSize(size);
    applyFontSize(size);
    try {
      localStorage.setItem('fgc_font_size', size);
    } catch {}
    setIsOpen(false);
  };

  // 外側クリックでメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800" />;
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
          isOpen || fontSize !== 'normal'
            ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/60'
            : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200'
        }`}
        title={`文字サイズを変更（現在: ${FONT_SIZE_MAP[fontSize].label}）`}
        aria-label="文字サイズ調整"
      >
        <div className="flex items-baseline font-bold leading-none select-none">
          <span className="text-[13px]">A</span>
          <span className="text-[9px] opacity-75">a</span>
        </div>
      </button>

      {/* 文字サイズ変更ポップオーバー */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 p-2 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 mb-1 text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider flex items-center gap-1">
            <Type className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>文字サイズ調整</span>
          </div>

          <div className="space-y-1">
            {(Object.keys(FONT_SIZE_MAP) as FontSizeOption[]).map((key) => {
              const opt = FONT_SIZE_MAP[key];
              const isSelected = fontSize === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectSize(key)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                      : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate">{opt.label}</span>
                    <span className={`text-[10px] font-normal ${isSelected ? 'opacity-80' : 'text-neutral-400 dark:text-neutral-500'}`}>
                      ({opt.scaleText})
                    </span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-1.5 border-t border-neutral-100 dark:border-neutral-800 px-1 text-[10px] text-neutral-400 dark:text-neutral-500 text-center">
            トレモ中でも見やすい大きさに変更できます
          </div>
        </div>
      )}
    </div>
  );
}
