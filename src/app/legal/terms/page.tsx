import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import {
  FileText,
  ChevronRight,
  ShieldCheck,
  Scale,
  Lock,
  AlertTriangle,
  CreditCard,
  Ban,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: '利用規約（Terms of Service）',
  description:
    'にこ太郎の格ゲーLAB（nikotaro.com）の利用規約。会員登録、有料サブスクリプション、知的財産権、禁止事項、免責事項について定めています。',
  canonicalUrl: '/legal/terms',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen pb-16 bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* ページ上部パンくず */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 sticky top-0 z-30 shadow-xs transition-colors">
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between text-xs">
          <nav className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 overflow-x-auto py-1">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors shrink-0">
              ホーム
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-300 dark:text-neutral-600" />
            <span className="font-semibold text-neutral-900 dark:text-white shrink-0">
              利用規約（Terms of Service）
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
        {/* ヘッダー */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 mb-3">
            <Scale className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>TERMS OF SERVICE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            利用規約
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
            本利用規約（以下「本規約」といいます）は、「にこ太郎の格ゲーLAB」（以下「当サイト」といいます）が提供するすべてのWebサイト、記事コンテンツ、および有料サービス（以下「本サービス」といいます）の利用条件を定めるものです。利用者の皆様（以下「ユーザー」といいます）は、本規約に同意のうえ本サービスをご利用ください。
          </p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
            <span>制定日: 2024年4月1日</span>
            <span>最終改定日: 2026年9月23日</span>
          </div>
        </div>

        {/* 第1条（総則および適用範囲） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
            第1条（適用および規約への同意）
          </h2>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              1. 本規約は、当サイトの閲覧、無料会員登録、有料会員（プレミアム会員）への加入、個別有料記事の購入、その他本サービスを利用するすべてのユーザーに適用されます。
            </p>
            <p>
              2. ユーザーは、本サービスを利用した時点で、本規約および<Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 underline font-bold mx-1">プライバシーポリシー</Link>のすべての記載内容に有効かつ取消不能な同意をしたものとみなされます。
            </p>
          </div>
        </section>

        {/* 第2条（アカウント登録および管理責任） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
            第2条（アカウント登録および管理責任）
          </h2>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              1. ユーザーは、会員登録にあたり、真実かつ正確な情報を登録するものとします。
            </p>
            <p>
              2. ユーザーは、自己の責任においてログイン認証情報（メールアドレス、パスワード、認証トークン等）を厳重に管理するものとします。
            </p>
            <p>
              3. <strong>【アカウント共有の禁止】</strong><br />
              ユーザーは、いかなる場合も、自己のアカウントを第三者に譲渡、貸与、売買、名義変更、または複数人で共有して利用させてはなりません。1つの有料会員アカウントを複数人で使い回す行為が発覚した場合、当サイト運営者は事前通知なく当該アカウントの停止または強制退会措置を講じることができます。
            </p>
          </div>
        </section>

        {/* 第3条（有料サービスおよびサブスクリプション） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <CreditCard className="w-5 h-5 text-indigo-500 shrink-0" />
            <h2>第3条（有料サービス・サブスクリプションおよび決済）</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              1. <strong>利用料金：</strong><br />
              有料サービス（プレミアム会員プラン、個別記事購入）の料金は、各案内ページおよび<Link href="/legal/tokusho" className="text-cyan-600 dark:text-cyan-400 underline font-bold mx-1">特定商取引法に基づく表記</Link>に明記された金額（消費税込）とします。
            </p>
            <p>
              2. <strong>自動更新（定期購入）：</strong><br />
              プレミアム会員プランは月額制の定期購入（サブスクリプション）サービスです。契約締結日から1ヶ月ごとに、ユーザーが解約手続きを完了するまで同額にて自動的に更新・課金されます。
            </p>
            <p>
              3. <strong>解約手続き（いつでも解約自由）：</strong><br />
              定期購読の解約は、Stripeから送信される決済管理リンク、マイページ、または当サイトの<Link href="/contact" className="text-cyan-600 dark:text-cyan-400 underline font-bold mx-1">お問い合わせフォーム</Link>よりいつでも申請可能です。次回更新日の前日までに解約手続きを行った場合、次回以降の請求は発生いたしません（解約手数料や違約金は一切ありません）。
            </p>
            <p>
              4. <strong>返金特約：</strong><br />
              デジタルコンテンツおよびオンラインサービスの性質上、決済完了後の返金、返品、または日割り計算による返金は原則としてお受けできません。
            </p>
          </div>
        </section>

        {/* 第4条（知的財産権およびゲーム著作物の位置づけ） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>第4条（知的財産権およびゲーム著作物の取り扱い）</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              1. <strong>非公式ファンサイトの明記：</strong><br />
              当サイトは個人の非公式攻略メディアであり、株式会社カプコンその他関連企業とは一切関係ありません。
            </p>
            <p>
              2. <strong>ゲーム著作権の帰属：</strong><br />
              本サービス内で引用・紹介されている『ストリートファイター6』等のゲーム画像、キャラクター名、ロゴ、動画、データ等の著作権および商標権その他の知的財産権は、株式会社カプコンおよび正当な権利者に帰属します。当サイトは株式会社カプコンの「カプコン著作物に関するガイドライン」を尊重して運営を行っております。
            </p>
            <p>
              3. <strong>独自コンテンツの著作権：</strong><br />
              当サイトに掲載されている攻略解説、立ち回り理論、実戦添削コーチング記事、オリジナルSVG図解、およびツールの著作権は、当サイト運営者（にこ太郎）に帰属します。
            </p>
            <p>
              4. <strong>有料対価の法的性質：</strong><br />
              本サービスの有料会員および有料記事の対価は、ゲーム著作物そのものではなく、<strong>筆者が独自に研究・執筆した立ち回り理論、判断簡略化メソッド、実戦指導アーカイブ、およびWebツールの開発・維持管理という知的役務</strong>に対して支払われるものです。
            </p>
          </div>
        </section>

        {/* 第5条（禁止事項） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <Ban className="w-5 h-5 text-rose-500 shrink-0" />
            <h2>第5条（禁止事項）</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>本サービスの有料コンテンツ（記事本文、画像、ツール等）を無断で転載、複製、配布、公衆送信、転売する行為</li>
              <li>1つの有料会員アカウントを複数人で共有または貸与する行為</li>
              <li>当サイトのサーバー、ネットワーク、または認証システムへの不正アクセス、スクレイピング、過度な負荷をかける行為</li>
              <li>本サービスのプログラムをリバースエンジニアリング、逆コンパイル、改変する行為</li>
              <li>当サイト運営者、他のユーザー、または株式会社カプコン等の第三者の名誉・信用を毀損する行為</li>
              <li>法令、裁判所の判決・決定・命令、または公序良俗に違反する行為</li>
              <li>その他、当サイト運営者が不適切と合理的に判断する行為</li>
            </ul>
          </div>
        </section>

        {/* 第6条（サービスの停止・中断・変更） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
            第6条（サービスの停止・中断・変更）
          </h2>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              当サイト運営者は、システムの保守点検、天災・停電等の不可抗力、通信回線の障害、ゲームの仕様変更、または運営上の都合により、ユーザーに事前通知することなく本サービスの提供を一時停止、中断、または変更することができます。
            </p>
          </div>
        </section>

        {/* 第7条（免責事項および損害賠償の制限・消費者契約法適合） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h2>第7条（免責事項および損害賠償責任の制限）</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              1. <strong>攻略情報の正確性に関する免責：</strong><br />
              当サイトは、掲載する攻略データ、フレーム数値、実戦理論について正確を期すよう努めておりますが、ゲームのバージョンアップデートや調整等により実際の挙動と異なる場合があり、その完全性・正確性を保証するものではありません。
            </p>
            <p>
              2. <strong>損害賠償責任の制限（消費者契約法第8条適合）：</strong><br />
              当サイト運営者に故意または重大な過失がある場合を除き、当サイト運営者は本サービスの利用に関してユーザーに生じた損害について責任を負いません。なお、消費者契約法の適用その他の理由により運営者が損害賠償責任を負う場合であっても、その賠償範囲はユーザーに直接かつ現実に生じた通常損害に限られ、<strong>賠償額は当該ユーザーが直近1ヶ月間に当サイトへ支払った利用料金の総額を上限</strong>とします。
            </p>
          </div>
        </section>

        {/* 第8条（規約の変更） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <h2 className="font-black text-base text-neutral-900 dark:text-white">第8条（本規約の変更）</h2>
          <p className="leading-relaxed">
            当サイト運営者は、民法第548条の4（定型約款の変更）の規定に基づき、必要に応じて本規約を変更することができます。変更後の本規約は、当サイト上に掲示した時点より効力を生じるものとし、変更後に本サービスを利用したユーザーは変更後の規約に同意したものとみなされます。
          </p>
        </section>

        {/* 第9条（準拠法および管轄裁判所） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <h2 className="font-black text-base text-neutral-900 dark:text-white">第9条（準拠法および裁判管轄）</h2>
          <p className="leading-relaxed">
            1. 本規約の解釈および適用にあたっては、日本法を準拠法とします。
          </p>
          <p className="leading-relaxed">
            2. 本サービスまたは本規約に関して生じた一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>
      </main>
    </div>
  );
}
