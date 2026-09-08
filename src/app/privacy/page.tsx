import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import { ShieldCheck, ChevronRight, AlertTriangle, FileText, Lock, Globe } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'プライバシーポリシー & 免責事項・著作権ガイドライン',
  description:
    'にこ太郎の格ゲーLAB（nikotaro.com）のプライバシーポリシー、カプコン様ガイドラインに基づく権利表記・免責事項、アクセス解析（Google Analytics）、広告配信に関する規定。',
  canonicalUrl: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pb-16 bg-[#f8fafc]">
      {/* ページ上部パンくず */}
      <div className="bg-white border-b border-neutral-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-neutral-500 overflow-x-auto py-1">
            <Link href="/" className="hover:text-neutral-900 transition-colors shrink-0">
              ホーム
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300" />
            <span className="font-semibold text-neutral-900 shrink-0">プライバシーポリシー &amp; 免責事項</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-neutral-100 text-neutral-600 mb-3">
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            プライバシーポリシー &amp; 免責事項
          </h1>
          <p className="text-xs text-neutral-400 mt-2 font-mono">
            最終改定日: 2026年9月8日
          </p>
        </div>

        {/* 1. 著作権・ゲーム内権利表記（カプコンガイドライン対応） */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 font-black text-base sm:text-lg border-b border-neutral-100 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>1. 著作権および権利表記（カプコン著作物ガイドラインに基づく表示）</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-3">
            <p>
              「にこ太郎の格ゲーLAB（nikotaro.com）」（以下、「当サイト」といいます）は、対戦格闘ゲームの攻略研究、プレイヤーコミュニティの技術向上を目的とした<strong>非公式の個人運営ファンサイト</strong>です。
            </p>
            <p>
              当サイトは、<strong>株式会社カプコン様、およびその他関連企業様とは一切関係ありません</strong>。
            </p>
            <p className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 text-xs">
              当サイトで引用・紹介しているゲーム画像、ロゴ、動画、音声、キャラクター名、フレームデータ等の知的財産権および著作権は、株式会社カプコン様ならびに各正当な権利保有者に帰属します。当サイトは株式会社カプコン様の定める「カプコン著作物に関するガイドライン」を尊重して運営を行っております。
            </p>
            <p>
              権利者様よりコンテンツに関する削除や修正の申し入れがあった場合は、内容を確認のうえ、速やかに適切な対応を行います。
            </p>
          </div>
        </section>

        {/* 2. Google Analytics (GA4) と Cookie について */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 font-black text-base sm:text-lg border-b border-neutral-100 pb-3">
            <Globe className="w-5 h-5 text-[#00a3c4] shrink-0" />
            <h2>2. アクセス解析ツール（Google Analytics 4）の利用について</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-3">
            <p>
              当サイトでは、サービスの向上および利便性改善を目的として、Google社が提供するアクセス解析ツール「Google Analytics 4（GA4）」を利用しています。
            </p>
            <p>
              Google Analyticsはデータ収集のために「Cookie（クッキー）」を使用しています。このトラフィックデータは匿名で収集されており、氏名、住所、メールアドレス、電話番号などの個人を特定する情報は一切含まれません。
            </p>
            <p>
              利用者は、ご使用のブラウザ設定によりCookieを無効化することで、データの収集を拒否することができます。Google Analyticsの利用規約およびプライバシーポリシーの詳細は、Google社の公式ページをご確認ください。
            </p>
          </div>
        </section>

        {/* 3. 広告配信・アフィリエイトプログラムに関する免責事項 */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 font-black text-base sm:text-lg border-b border-neutral-100 pb-3">
            <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
            <h2>3. 広告配信およびアフィリエイトプログラムについて</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-3">
            <p>
              当サイトでは、第三者配信の広告サービス（Google AdSense、各種アドネットワーク等）や、アフィリエイトプログラム（Amazonアソシエイト・プログラム等）を利用する場合があります。
            </p>
            <p>
              第三者配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセス情報（Cookie等）を使用することがあります。
            </p>
            <p>
              Amazonのアソシエイトとして、当サイト運営者は適格販売により収入を得る場合があります。
            </p>
          </div>
        </section>

        {/* 4. 免責事項 */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 font-black text-base sm:text-lg border-b border-neutral-100 pb-3">
            <Lock className="w-5 h-5 text-slate-600 shrink-0" />
            <h2>4. 免責事項</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-3">
            <p>
              当サイトに掲載されている情報（コンボダメージ、フレームデータ、起き攻め状況等）については、筆者の実戦検証および公式情報に基づき正確を期すよう努めておりますが、ゲームのバージョンアップデートやパッチ適用、仕様変更により、一時的に実際の挙動と異なる場合がございます。
            </p>
            <p>
              当サイトの掲載内容によって生じた直接的・間接的な損害やトラブルについて、当サイト運営者は一切の責任を負いかねますので、あらかじめご了承ください。
            </p>
          </div>
        </section>

        {/* 5. お問い合わせ窓口 */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-3 text-xs sm:text-sm text-neutral-700">
          <h2 className="font-black text-base text-neutral-900">5. お問い合わせ</h2>
          <p className="leading-relaxed">
            本ポリシーに関するご質問や、掲載内容に関する修正・削除のご要望は、当サイト運営者の<a href="https://x.com/nikotarosun" target="_blank" rel="noopener noreferrer" className="text-[#00a3c4] hover:underline font-bold">公式X（@nikotarosun）</a>のダイレクトメッセージ、またはnote公式アカウントよりお問い合わせください。
          </p>
        </section>
      </main>
    </div>
  );
}
