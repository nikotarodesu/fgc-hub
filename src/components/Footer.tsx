'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const tapCountRef = useRef(0);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 3500);
  };

  // フッターのⒸを3秒以内に5回タップで管理者モード切り替え
  const handleCopyrightClick = () => {
    if (!resetTimerRef.current) {
      resetTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
        resetTimerRef.current = null;
      }, 3000);
    }

    tapCountRef.current += 1;

    if (tapCountRef.current >= 5) {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      tapCountRef.current = 0;

      try {
        const current = localStorage.getItem('fgc_admin_mode') === 'true';
        const next = !current;
        if (next) {
          localStorage.setItem('fgc_admin_mode', 'true');
          showToast('🔑 管理者権限を有効化しました（全有料記事を開放中）');
        } else {
          localStorage.removeItem('fgc_admin_mode');
          showToast('🔒 管理者権限を解除しました（通常表示に戻しました）');
        }

        // 開いている記事ページ等へリアルタイム即時反映
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('fgc_admin_mode_changed', { detail: { enabled: next } })
          );
        }
      } catch (err) {
        console.error('Failed to toggle admin mode:', err);
      }
    }
  };

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs mt-24 transition-colors relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src="/icon.png"
                  alt="にこ太郎"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-neutral-900 dark:text-white text-sm tracking-tight">にこ太郎の格ゲーLAB</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md text-xs">
              ストリートファイター6全キャラ1800MR以上の筆者「にこ太郎」による攻略メディア。フレームデータ、実戦セットプレイ、普遍的な共通上達論を発信しています。
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://x.com/nikotarosun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium"
              >
                <span>公式X (@nikotarosun)</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
              <span className="text-neutral-200 dark:text-neutral-700">|</span>
              <a
                href="https://note.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium"
              >
                <span>note公式ページ</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">法務・ポリシー</h4>
            <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
              <li><Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">プライバシーポリシー &amp; 免責事項</Link></li>
              <li><Link href="/legal/tokusho" className="hover:text-neutral-900 dark:hover:text-white transition-colors">特定商取引法に基づく表記</Link></li>
              <li>
                <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 mt-2 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Stripe暗号化決済</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400 dark:text-neutral-500">
          <p>
            <button
              type="button"
              onClick={handleCopyrightClick}
              className="cursor-pointer select-none inline-block hover:text-neutral-800 dark:hover:text-neutral-200 active:scale-125 transition-transform"
              aria-label="Copyright"
            >
              ©
            </button>{' '}
            {new Date().getFullYear()} にこ太郎の格ゲーLAB (nikotaro.com). All rights reserved.
          </p>
          <p>※ 本サイトは個人の非公式攻略メディアであり、株式会社カプコンの公式サービスではありません。</p>
        </div>
      </div>

      {/* 管理者モード切り替え通知トースト */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl bg-neutral-900/95 dark:bg-white/95 text-white dark:text-neutral-950 text-xs font-bold shadow-2xl backdrop-blur-md border border-neutral-700 dark:border-neutral-200 animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none">
          {toastMessage}
        </div>
      )}
    </footer>
  );
}
