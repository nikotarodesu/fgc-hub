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

  // フッターのⒸを5秒以内に10回タップで管理者モード（プレミアム会員全権限）切り替え
  const handleCopyrightClick = () => {
    if (!resetTimerRef.current) {
      resetTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
        resetTimerRef.current = null;
      }, 5000);
    }

    tapCountRef.current += 1;

    if (tapCountRef.current >= 10) {
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
          localStorage.setItem('fgc_membership_token', 'active_admin_session');
          showToast('👑 管理者モード（プレミアム会員権限）を有効化しました');
        } else {
          localStorage.removeItem('fgc_admin_mode');
          localStorage.removeItem('fgc_membership_token');
          showToast('🔒 管理者モードを解除しました（通常表示に戻しました）');
        }

        // 開いている記事ページ・ヘッダー・マイページ等へリアルタイム即時反映
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800 bg-neutral-100 dark:bg-neutral-800 shrink-0">
                <Image
                  src="/icon.png"
                  alt="にこ太郎"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-neutral-900 dark:text-white text-sm tracking-tight">にこ太郎の格ゲーLAB</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg text-xs">
              スト6全キャラ1800MR以上。note大会で2連覇を達成🏆。note有料記事は累計2,000部突破・フォロワー2,500人。勝率に直結する立ち回り理論やコンボ・起き攻めを発信中。
            </p>

            {/* 🏆 note大会 優勝記事 */}
            <div className="flex items-center gap-2 text-xs flex-wrap pt-0.5">
              <span className="text-neutral-400 dark:text-neutral-500 font-semibold text-[11px]">🏆 大会記事:</span>
              <a
                href="https://note.com/nikotarosun/n/n081a67f53aa8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white underline underline-offset-2 font-medium"
              >
                <span>優勝記事①</span>
                <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
              </a>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <a
                href="https://note.com/nikotarosun/n/nbaad82557ae9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white underline underline-offset-2 font-medium"
              >
                <span>優勝記事②</span>
                <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
              </a>
            </div>

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
                href="https://note.com/nikotarosun"
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
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">攻略コンテンツ</h4>
            <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
              <li><Link href="/sf6/devices" className="hover:text-neutral-900 dark:hover:text-white transition-colors">デバイス・プレイ環境</Link></li>
              <li><Link href="/glossary" className="hover:text-neutral-900 dark:hover:text-white transition-colors">格ゲー用語解説・スト6辞典</Link></li>
              <li><Link href="/sf6/strategy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">スト6共通技術・上達論</Link></li>
              <li><Link href="/membership" className="hover:text-neutral-900 dark:hover:text-white transition-colors">プレミアム会員案内</Link></li>
              <li><Link href="/author" className="hover:text-neutral-900 dark:hover:text-white transition-colors">著者紹介・実績</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">法務・ポリシー</h4>
            <ul className="space-y-2 text-neutral-500 dark:text-neutral-400">
              <li><Link href="/legal/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">利用規約（Terms of Service）</Link></li>
              <li><Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">プライバシーポリシー &amp; 免責事項</Link></li>
              <li><Link href="/legal/tokusho" className="hover:text-neutral-900 dark:hover:text-white transition-colors">特定商取引法に基づく表記</Link></li>
              <li><Link href="/contact" className="hover:text-neutral-900 dark:hover:text-white transition-colors">お問い合わせ</Link></li>
              <li>
                <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 mt-2 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Stripe暗号化決済</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* パートナー・提携バナー枠 (プロチーム・公式メディア風) */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-semibold">
              PARTNERS
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-400 font-medium leading-none">
              PR
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex flex-col items-center">
              <a
                href="https://px.a8.net/svt/ejp?a8mat=4BCJJV+A4E2A+5U1O+5YZ75"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="group block rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all opacity-90 hover:opacity-100 shadow-2xs hover:shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={120}
                  height={60}
                  alt="BTOゲーミングPC OZ GAMING"
                  src="https://www22.a8.net/svt/bgt?aid=260925691017&wid=001&eno=01&mid=s00000027222001003000&mc=1"
                  className="block"
                />
              </a>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width={1}
                height={1}
                src="https://www19.a8.net/0.gif?a8mat=4BCJJV+A4E2A+5U1O+5YZ75"
                alt=""
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 space-y-2 text-[11px] text-neutral-400 dark:text-neutral-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
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
            <p className="text-center sm:text-right">
              ※ STREET FIGHTERは株式会社カプコンの登録商標です。©CAPCOM / ©CAPCOM U.S.A., INC. ALL RIGHTS RESERVED.
            </p>
          </div>
          <p className="text-center sm:text-left text-[10.5px] text-neutral-400/80">
            ※ 本サイトは対戦格闘ゲームの攻略研究を目的とした個人の非公式ファンメディアであり、株式会社カプコンの公式サービスではありません。
          </p>
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
