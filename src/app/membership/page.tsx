'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType: 'membership' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Stripe APIキーの設定後に本番決済が有効化されます。');
      }
    } catch {
      alert('決済処理の呼び出しに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-xs font-medium mb-3">
            <span>にこ太郎の格ゲーLAB プレミアムマガジン</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
            スト6完全攻略マガジン（読み放題）
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            全キャラ1800MR以上の筆者による徹底攻略、最新アップデート時の新コンボ・立ち回り解説がすべて読み放題。<br className="hidden sm:inline" />
            単体購入よりも圧倒的にお得に最新の攻略情報へアクセスいただけます。
          </p>
        </div>

        {/* プラン比較 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {/* 単体購入 */}
          <div className="p-6 rounded-xl bg-white border border-neutral-200/80 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">単体記事の買い切り</h3>
              <p className="text-xs text-neutral-500 mb-4">特定のキャラクターの攻略記事だけ読みたい方に</p>
              <div className="text-2xl font-bold text-neutral-900 mb-4">
                ¥500〜980 <span className="text-xs font-normal text-neutral-500">/ 1記事</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-500" />
                  <span>購入した記事のみ永久閲覧可能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-500" />
                  <span>アプデ時の追記も無料で閲覧</span>
                </li>
                <li className="flex items-center gap-2 text-neutral-400">
                  <span>× 他キャラクターの攻略記事は別売り</span>
                </li>
              </ul>
            </div>
            <Link
              href="/"
              className="mt-6 w-full py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs text-center transition-colors"
            >
              記事一覧から選んで購入
            </Link>
          </div>

          {/* 月額マガジン */}
          <div className="p-6 rounded-xl bg-white border-2 border-neutral-900 relative flex flex-col justify-between shadow-md">
            <div className="absolute -top-3 right-6 bg-neutral-900 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded shadow-xs">
              おすすめ
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">月額プレミアムマガジン</h3>
              <p className="text-xs text-neutral-500 mb-4">スト6全キャラ攻略・立ち回り徹底解説・共通理論まで全記事アクセス</p>
              <div className="text-3xl font-bold text-neutral-900 mb-4">
                ¥980 <span className="text-xs font-normal text-neutral-500">/ 月（税込）</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900 font-bold" />
                  <span><strong>過去・現在のすべての有料記事が読み放題</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>全キャラ1800MR以上の視点による実戦立ち回り・キャラ対策</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>最新パッチ追記・アップデート検証記事もすべて閲覧可能</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900" />
                  <span>いつでもマイページから1クリックで解約可能</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="mt-6 w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-semibold text-xs text-center transition-colors cursor-pointer shadow-xs"
            >
              {loading ? '処理中...' : '今すぐマガジンに参加する（Stripe安全決済）'}
            </button>
          </div>
        </div>

        {/* よくある質問 */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-bold text-neutral-900 text-center mb-6">よくあるご質問</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white border border-neutral-200/80 shadow-xs">
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Q. 解約はいつでもできますか？</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                はい、いつでも1クリックで解約いただけます。解約料や違約金等は一切ございません。
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white border border-neutral-200/80 shadow-xs">
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Q. 記事はどのように追加・更新されますか？</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                実戦対戦リプレイの添削、最新バージョンに対応したコンボレシピ、高MR帯でのキャラ別対策が随時追加されます。マガジン会員は追加料金なしですべて閲覧いただけます。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
