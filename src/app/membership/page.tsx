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
            <span>にこ太郎の格ゲーLAB プレミアム会員</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 tracking-tight">
            スト6完全攻略 プレミアム会員（読み放題）
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
                ¥500 <span className="text-xs font-normal text-neutral-500">/ 1記事</span>
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

          {/* プレミアム会員 */}
          <div className="p-6 rounded-xl bg-white border-2 border-neutral-900 relative flex flex-col justify-between shadow-md">
            <div className="absolute -top-3 right-6 bg-neutral-900 text-white font-semibold text-[10px] px-2.5 py-0.5 rounded shadow-xs">
              おすすめ
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 mb-1">プレミアム会員</h3>
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
                  <Check className="w-3.5 h-3.5 text-neutral-900 font-bold" />
                  <span>逆引きリーサルツール・全フレーム状況別起き攻めデータ利用可能</span>
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
                  <span>契約期間の縛りなし・いつでも簡単に解約可能</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="mt-6 w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-semibold text-xs text-center transition-colors cursor-pointer shadow-xs"
            >
              {loading ? '処理中...' : '今すぐプレミアム会員に登録する（Stripe安全決済）'}
            </button>
          </div>
        </div>

        {/* よくある質問 */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-bold text-neutral-900 text-center mb-6">よくあるご質問</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white border border-neutral-200/80 shadow-xs">
              <h4 className="text-xs font-bold text-neutral-900 mb-2">Q. 解約はいつでもできますか？解約の手順を教えてください</h4>
              <div className="text-xs text-neutral-600 leading-relaxed space-y-2.5">
                <p>
                  はい、契約期間の縛りや違約金・解約手数料等は一切なく、いつでも自由に解約・自動更新停止いただけます。解約は以下のいずれかの方法でお手続きいただけます：
                </p>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200/80 space-y-2 text-neutral-700">
                  <div>
                    <span className="font-bold text-neutral-900 block text-xs">① Stripeからの決済メールより解約</span>
                    <span className="text-[11px] text-neutral-500 leading-normal block mt-0.5">
                      決済時にStripeから自動送信される領収書メール（または定期請求メール）内の「登録の管理 / サブスクリプションの管理」リンクより、いつでもご自身で解約いただけます。
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-neutral-200/60">
                    <span className="font-bold text-neutral-900 block text-xs">② お問い合わせフォームより解約申請</span>
                    <span className="text-[11px] text-neutral-500 leading-normal block mt-0.5">
                      ご登録時のメールアドレスを添えて、<Link href="/contact" className="text-[#00a3c4] underline font-medium">お問い合わせフォーム</Link>（お問い合わせ種別：プレミアム会員・解約について）よりご連絡いただければ、運営側にて速やかに解約処理を代行対応いたします。
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400">
                  ※ 次回更新日の前日までにお手続きいただければ、次回以降の請求は発生いたしません。解約後も現在の課金期間終了まではすべての記事をそのまま閲覧いただけます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
