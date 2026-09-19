'use client';

import React, { useState, useEffect } from 'react';
import {
  getOkizemeDataByCharacter,
  FrameOkizemeData,
} from '@/data/articles/okizemeRegistry';
import {
  X,
  Zap,
  ArrowDown,
  ChevronRight,
  ShieldAlert,
  Swords,
  CornerDownRight,
} from 'lucide-react';

interface OkizemeQuickModalProps {
  frameText?: string | null;
  preferredPosition?: 'center' | 'corner';
  onClose?: () => void;
  character?: string;
}

export default function OkizemeQuickModal({
  frameText: propFrameText,
  preferredPosition: propPosition,
  onClose: propOnClose,
  character: propCharacter,
}: OkizemeQuickModalProps) {
  const [activeFrame, setActiveFrame] = useState<string | null>(propFrameText || null);
  const [activeCharacter, setActiveCharacter] = useState<string | undefined>(propCharacter);
  const [activePosition, setActivePosition] = useState<'center' | 'corner' | 'all'>(
    propPosition || 'all'
  );
  const [isOpen, setIsOpen] = useState<boolean>(!!propFrameText);

  // propsの変更に追従
  useEffect(() => {
    if (propFrameText) {
      setActiveFrame(propFrameText);
      if (propPosition) setActivePosition(propPosition);
      setIsOpen(true);
    }
  }, [propFrameText, propPosition]);

  useEffect(() => {
    if (propCharacter) {
      setActiveCharacter(propCharacter);
    }
  }, [propCharacter]);

  // グローバルカスタムイベント 'open_okizeme_modal' をリッスン（どこからでもワンタップで呼出可能）
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ frame: string; position?: 'center' | 'corner'; character?: string }>;
      if (customEvent.detail && customEvent.detail.frame) {
        setActiveFrame(customEvent.detail.frame);
        if (customEvent.detail.character) {
          setActiveCharacter(customEvent.detail.character);
        } else if (propCharacter) {
          setActiveCharacter(propCharacter);
        }
        if (customEvent.detail.position) {
          setActivePosition(customEvent.detail.position);
        } else {
          setActivePosition('all');
        }
        setIsOpen(true);
      }
    };

    window.addEventListener('open_okizeme_modal', handleOpenEvent);
    return () => {
      window.removeEventListener('open_okizeme_modal', handleOpenEvent);
    };
  }, [propCharacter]);

  // ESCキーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (propOnClose) propOnClose();
  };

  if (!isOpen || !activeFrame) return null;

  // キャラクター固有の起き攻めデータを取得（他キャラへの流用・フォールバックは絶対に行わない）
  const currentCharacter = activeCharacter || propCharacter;
  const data: FrameOkizemeData | null = getOkizemeDataByCharacter(currentCharacter, activeFrame);

  // 起き攻めフレームセクション該当見出しへのスムーズスクロール
  const handleScrollToSection = () => {
    handleClose();
    setTimeout(() => {
      const allElements = Array.from(document.querySelectorAll('div, span, h3, h4, p'));
      const targetEl = allElements.find((el) => {
        const txt = el.textContent || '';
        return (
          (txt.includes(`【${data?.frameKey || activeFrame}】`) ||
            txt.includes(`【${activeFrame}】`) ||
            txt.includes(`${activeFrame}の特徴`)) &&
          el.children.length <= 3
        );
      });

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.classList.add(
          'ring-4',
          'ring-emerald-500',
          'bg-emerald-50/70',
          'dark:bg-emerald-950/50',
          'transition-all',
          'duration-500'
        );
        setTimeout(() => {
          targetEl.classList.remove('ring-4', 'ring-emerald-500', 'bg-emerald-50/70', 'dark:bg-emerald-950/50');
        }, 3000);
      } else {
        // 見つからない場合は起き攻めセクションの先頭へスクロール（エレナは⑥、リュウ等は⑤）
        const secHeader = Array.from(document.querySelectorAll('h2')).find((el) => {
          const txt = el.textContent || '';
          return txt.includes('起き攻めフレーム') || txt.includes('起き攻め');
        });
        if (secHeader) {
          secHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 120);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="起き攻めフレーム連携プレビュー"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[85vh] sm:max-h-[80vh] flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* モーダルヘッダー */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-base sm:text-lg text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40">
                {data?.displayFrame || activeFrame}
              </span>
              <span className="font-bold text-xs sm:text-sm text-white">
                起き攻め連携（{currentCharacter === 'エレナ' ? '⑥' : '⑤'}連動）
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 状況切替タブ（画面中央 / 画面端） */}
        {data && data.center && data.corner && (
          <div className="flex items-center gap-1 p-2 bg-neutral-100 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 text-xs shrink-0">
            <button
              type="button"
              onClick={() => setActivePosition('all')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activePosition === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              すべて表示
            </button>
            <button
              type="button"
              onClick={() => setActivePosition('center')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activePosition === 'center'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-sky-600'
              }`}
            >
              画面中央
            </button>
            <button
              type="button"
              onClick={() => setActivePosition('corner')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                activePosition === 'corner'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-amber-600'
              }`}
            >
              画面端
            </button>
          </div>
        )}

        {/* モーダル本文（スクロール可能エリア） */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 [scrollbar-width:thin]">
          {!data ? (
            <div className="py-6 text-center text-neutral-400">
              <p className="font-bold text-sm text-neutral-700 dark:text-neutral-300">
                「{activeFrame}」の起き攻め連携データはありません。
              </p>
              <p className="text-xs mt-1 text-neutral-500 dark:text-neutral-400">
                {currentCharacter === 'エレナ' ? '⑥' : '⑤'} 起き攻めフレームセクションの全体解説をご確認ください。
              </p>
              <p className="text-[11px] mt-2 text-neutral-400 dark:text-neutral-500">
                ※ 他キャラクターの起き攻めデータは流用せず、キャラクター固有の確定データのみを表示しています。
              </p>
            </div>
          ) : (
            <>

              {/* 画面中央の起き攻め */}
              {data.center && (activePosition === 'all' || activePosition === 'center') && (
                <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 p-3 space-y-2">
                  <div className="flex items-center justify-between border-b border-sky-200/80 dark:border-sky-900/40 pb-1.5">
                    <span className="font-bold text-sky-800 dark:text-sky-300 flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      画面中央での起き攻め選択肢
                    </span>
                    {data.center.finishingMoves && (
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                        主な〆: {data.center.finishingMoves.join(', ')}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5 pt-0.5">
                    {data.center.options.map((opt, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2 text-xs leading-relaxed">
                        <CornerDownRight className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 画面端の起き攻め */}
              {data.corner && (activePosition === 'all' || activePosition === 'corner') && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 p-3 space-y-2">
                  <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-amber-900/40 pb-1.5">
                    <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      画面端での起き攻め選択肢
                    </span>
                    {data.corner.finishingMoves && (
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                        主な〆: {data.corner.finishingMoves.slice(0, 2).join(', ')}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5 pt-0.5">
                    {data.corner.options.map((opt, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2 text-xs leading-relaxed">
                        <CornerDownRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* モーダルフッター（アクションボタン） */}
        <div className="p-3 bg-neutral-50 dark:bg-neutral-800/90 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={handleScrollToSection}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
          >
            <span>{currentCharacter === 'エレナ' ? '⑥' : '⑤'}の解説全文へ移動</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-colors cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
