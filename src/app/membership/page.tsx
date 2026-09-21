'use client';

import { useState, useMemo } from 'react';
import { Check, Sparkles, Trophy, ExternalLink, ChevronRight, CheckCircle2, ShieldCheck, HelpCircle, Flame, Crown } from 'lucide-react';
import Link from 'next/link';
import { ARTICLES_DATA } from '@/data/articles';
import LethalToolPreviewModal from '@/components/LethalToolPreviewModal';
import { useAuth } from '@/contexts/AuthContext';

export default function MembershipPage() {
  const [loading, setLoading] = useState(false);
  const [isLethalPreviewOpen, setIsLethalPreviewOpen] = useState(false);
  const { user, isPremium } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      // 未ログインの場合は購入前に安全なログインへ案内
      window.location.href = '/auth/login?next=/membership&action=subscribe';
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'monthly', userId: user?.id, userEmail: user?.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.demo) {
        window.location.href = data.redirectUrl || '/account/subscription';
      } else {
        alert(data.error || 'Stripe APIキーの設定後に本番決済が有効化されます。');
      }
    } catch {
      alert('決済処理の呼び出しに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  // 実データからの集計
  const stats = useMemo(() => {
    const totalArticles = ARTICLES_DATA.length;
    const paidArticlesCount = ARTICLES_DATA.filter((a) => a.isPaid).length;

    return {
      totalArticles,
      paidArticlesCount,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
        
        {/* 1. プレミアム会員で利用できることの短い説明 */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>にこ太郎の格ゲーLAB プレミアム会員</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            スト6攻略＆実戦添削 読み放題プラン
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mx-auto">
            全キャラ1800MR以上の筆者による徹底攻略ガイド、実戦添削コーチングアーカイブ、逆引きリーサルツールがすべて使い放題。実戦の判断を迷わせない確かな攻略データをお届けします。
          </p>

          {isPremium ? (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 max-w-md mx-auto space-y-2">
              <div className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
                <Crown className="w-4 h-4 fill-current text-amber-500" />
                <span>すでにプレミアム会員としてご登録済みです</span>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                すべての限定記事やツールをご利用いただけます。契約状況の確認・変更はマイページから行えます。
              </p>
              <div className="pt-1">
                <Link
                  href="/account/subscription"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  マイページ・契約管理へ進む
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                >
                  {loading ? '処理中...' : '今すぐプレミアム会員に登録する（¥980/月）'}
                </button>
                <Link
                  href="/auth/login"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs sm:text-sm border border-neutral-200 dark:border-neutral-700 transition-colors text-center"
                >
                  ログイン
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Stripe暗号化決済 / クレジットカード情報非保持 / いつでも解約可能</span>
              </div>
            </div>
          )}
        </section>

        {/* 2. 現在公開中の対象コンテンツ */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              現在公開中の対象コンテンツ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white block">
                {stats.totalArticles}件
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">公開中の全記事数</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white block">
                {stats.paidArticlesCount}件
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">うち有料記事</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 block">
                利用可
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">逆引きリーサルツール</span>
            </div>
          </div>
        </section>

        {/* 3. 特典の具体的な説明（体験機能付き） */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-lg sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              会員限定で手に入る4つの特典
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              トレモですぐ使えてランクマッチの勝率安定に直結する攻略データと独自ツール。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 特典1 */}
            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">起き攻めセットプレイ</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                  全フレーム状況別の起き攻めセットプレイ完全収録
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  その場・後ろ受け身の両対応重ねから、相手の無敵暴れを安全ガードできる「詐欺飛び」まで完全収録。実戦のターン継続率を劇的に高めます。
                </p>
              </div>
            </div>

            {/* 特典2 */}
            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">実戦厳選コンボ</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                  画面中央・画面端・リーサルの高火力レシピ
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  ノーゲージでのライン運び、バーンアウト時の削り連携、SA3フィニッシュまで、クラシック・モダン両対応で実用性の高いルートを厳選網羅。
                </p>
              </div>
            </div>

            {/* 特典3 (体験機能あり) */}
            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border-2 border-cyan-500/80 dark:border-cyan-500/60 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none -mr-6 -mt-6"></div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">WEB限定ツール</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                    体験可能 🔍
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                  相手残りHPから倒し切る「逆引きリーサルツール」
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  相手の残り体力や手持ちのDゲージ・SA状況を入力するだけで、登録済みのコンボから条件に合う倒し切り候補を瞬時に検索。リーサル判断を強力にアシストします。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsLethalPreviewOpen(true)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:hover:bg-cyan-900 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>どんなツールか実際に試してみる（無料体験）</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 特典4 */}
            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">継続的なアップデート</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1.5 leading-snug">
                  バージョンアップ・キャラ調整時も無料追記
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  バランス調整や新シーズン突入時も攻略記事を随時アップデート。契約期間中は追加費用なしで常に最新の攻略追記内容を閲覧し続けられます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 買い切りとプレミアム会員の比較 */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-lg sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              買い切りとプレミアム会員の比較
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              プレイスタイルに合わせて最適なプランをお選びいただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* 単体購入 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">単体記事の買い切り</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">特定のキャラクターの攻略記事だけ読みたい方に</p>
                <div className="text-2xl font-black text-neutral-900 dark:text-white mb-4">
                  ¥500 <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">/ 1記事（永久閲覧）</span>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>購入した記事のみ永久閲覧可能</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>対象記事のアプデ追記も追加料金なしで閲覧</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
                    <span>× 他キャラクターの攻略記事・コーチングは別売り</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/"
                className="mt-6 w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs text-center transition-colors"
              >
                記事一覧から選んで購入
              </Link>
            </div>

            {/* プレミアム会員 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-white relative flex flex-col justify-between shadow-md">
              <div className="absolute -top-3 right-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-[10px] px-2.5 py-0.5 rounded shadow-xs">
                おすすめ
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">プレミアム会員</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                  公開中の全攻略記事・立ち回り徹底解説・コーチングまで全アクセス
                </p>
                <div className="text-3xl font-black text-neutral-900 dark:text-white mb-4">
                  ¥980 <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">/ 月（税込）</span>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white font-bold shrink-0" />
                    <span><strong>公開中のすべての有料記事・実戦添削が読み放題</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white font-bold shrink-0" />
                    <span>逆引きリーサルツール・起き攻めデータ利用可能</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0" />
                    <span>全キャラ1800MR以上の視点による実戦立ち回り・キャラ対策</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0" />
                    <span>最新パッチ追記・アップデート検証記事もすべて閲覧可能</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0" />
                    <span>契約期間の縛りなし・いつでも簡単に解約可能</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="mt-6 w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 disabled:bg-neutral-400 text-white dark:text-neutral-900 font-bold text-xs text-center transition-colors cursor-pointer shadow-xs"
              >
                {loading ? '処理中...' : '今すぐプレミアム会員に登録する（Stripe安全決済）'}
              </button>
            </div>
          </div>
        </section>

        {/* 5. 更新方針と過去のコーチングアーカイブの位置づけ */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              更新方針とコーチングアーカイブの位置づけ
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <p>
              <strong>現行攻略記事のアップデート方針：</strong><br />
              『リュウ完全攻略』をはじめとするキャラクター攻略記事は、カプコン社によるゲームの大型アップデートやバランス調整に合わせて随時検証を行い、追記・修正を実施しています。プレミアム会員期間中および単体購入いただいた方は、追加料金なしで更新内容を閲覧いただけます。
            </p>
            <p>
              <strong>過去のコーチング記事の位置づけ：</strong><br />
              サイト内に掲載されている「実戦添削コーチング記事」は、各受講生の実戦リプレイをもとに実施した当時の対戦指導記録（2024年〜2025年実施）です。当時のバージョン仕様に基づいているため、最新パッチとは一部の技性能やフレームが異なる場合がありますが、立ち回りの考え方や判断の簡略化プロセスなどの普遍的な上達論としてご活用いただけます。
            </p>
          </div>
        </section>

        {/* 6. 閲覧方法、解約方法など既存のFAQ */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-lg sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              よくあるご質問（FAQ）
            </h2>
          </div>
          <div className="space-y-3">
            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-2">
                Q. 解約はいつでもできますか？解約の手順を教えてください
              </h4>
              <div className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-2.5">
                <p>
                  はい、契約期間の縛りや違約金・解約手数料等は一切なく、いつでも自由に解約・自動更新停止いただけます。解約は以下のいずれかの方法でお手続きいただけます：
                </p>
                <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 space-y-2 text-neutral-700 dark:text-neutral-200">
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white block text-xs">① Stripeからの決済メールより解約</span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal block mt-0.5">
                      決済時にStripeから自動送信される領収書メール（または定期請求メール）内の「登録の管理 / サブスクリプションの管理」リンクより、いつでもご自身で解約いただけます。
                    </span>
                  </div>
                  <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
                    <span className="font-bold text-neutral-900 dark:text-white block text-xs">② お問い合わせフォームより解約申請</span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal block mt-0.5">
                      ご登録時のメールアドレスを添えて、<Link href="/contact" className="text-cyan-600 dark:text-cyan-400 underline font-medium">お問い合わせフォーム</Link>（お問い合わせ種別：プレミアム会員・解約について）よりご連絡いただければ、運営側にて速やかに解約処理を代行対応いたします。
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                  ※ 次回更新日の前日までにお手続きいただければ、次回以降の請求は発生いたしません。解約後も現在の課金期間終了まではすべての記事をそのまま閲覧いただけます。
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-2">
                Q. 会員登録後の閲覧方法を教えてください
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Stripe決済完了後、即座に閲覧トークンがブラウザに付与され、有料記事の鍵（Paywall）が自動解除されます。また、登録完了メールに記載の専用認証リンクからもいつでも閲覧状態を復元できます。
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-2">
                Q. 支払い方法やクレジットカード情報・個人情報の安全性はどうなっていますか？
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                お支払いには各種クレジットカード（Visa、Mastercard、JCB、American Express等）をご利用いただけます。決済は国際的なセキュリティ基準（PCI DSS）に準拠したStripe（Stripe, Inc.）により安全に直接処理され、当サイトのサーバーにお客様のクレジットカード情報が保持されることは一切ありません。個人情報の適切な取り扱いについては<Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 underline font-medium">プライバシーポリシー</Link>をご確認ください。
              </p>
            </div>
          </div>
        </section>

        {/* 7. 登録への案内（末尾） */}
        <section className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 text-center space-y-4 shadow-md">
          <h2 className="text-lg sm:text-2xl font-black tracking-tight">
            スト6の勝率を劇的に変える攻略データを今すぐ手に入れよう
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            月額¥980（税込）で全記事・全ツールが読み放題。いつでもワンクリックで解約可能です。
          </p>
          <div className="pt-2">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-white text-neutral-950 font-bold text-xs sm:text-sm hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
            >
              {loading ? '処理中...' : 'プレミアム会員に登録する（Stripe安全決済）'}
            </button>
            <p className="text-[11px] text-neutral-400 mt-2.5">
              ご登録の際は、
              <Link href="/privacy" className="text-cyan-300 underline underline-offset-2 hover:text-white mx-1">
                プライバシーポリシー
              </Link>
              および
              <Link href="/legal/tokusho" className="text-cyan-300 underline underline-offset-2 hover:text-white mx-1">
                特定商取引法に基づく表記
              </Link>
              をご確認ください。
            </p>
          </div>
        </section>

      </main>

      {/* 逆引きリーサルツール無料体験モーダル */}
      <LethalToolPreviewModal
        isOpen={isLethalPreviewOpen}
        onClose={() => setIsLethalPreviewOpen(false)}
      />
    </div>
  );
}
