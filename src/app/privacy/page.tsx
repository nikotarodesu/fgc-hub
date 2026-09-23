import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo';
import {
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
  FileText,
  Lock,
  Globe,
  UserCheck,
  CreditCard,
  Trash2,
  Bell,
  Scale,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'プライバシーポリシー & 個人情報の取り扱い・免責事項',
  description:
    'にこ太郎の格ゲーLAB（nikotaro.com）のプライバシーポリシー。会員登録、Stripe暗号化決済、カプコン様著作権ガイドライン、個人情報の利用目的・保護方針について定めています。',
  canonicalUrl: '/privacy',
});

export default function PrivacyPolicyPage() {
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
              プライバシーポリシー &amp; 個人情報の取り扱い
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
        {/* ヘッダー */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>LEGAL &amp; PRIVACY POLICY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
            プライバシーポリシー &amp; 個人情報の取り扱い方針
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
            「にこ太郎の格ゲーLAB」（以下「当サイト」といいます）は、ユーザーの皆様に安心して攻略コンテンツや会員向け機能をご利用いただけるよう、個人情報保護法および関連法令を遵守し、以下のとおり個人情報を適切に取り扱います。
          </p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
            <span>制定日: 2024年4月1日</span>
            <span>最終改定日: 2026年9月21日</span>
          </div>
        </div>

        {/* 1. 著作権および権利表記（カプコンガイドライン対応） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <h2>1. 著作権および権利表記（カプコン著作物ガイドラインに基づく表示）</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              当サイト（nikotaro.com）は、対戦格闘ゲームの攻略研究およびコミュニティの技術向上を目的とした<strong>非公式の個人運営ファンサイト</strong>です。
            </p>
            <p>
              当サイトは、<strong>株式会社カプコン様、およびその他関連企業様とは一切関係ありません</strong>。
            </p>
            <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs">
              当サイトで引用・紹介しているゲーム画像、ロゴ、動画、音声、キャラクター名、フレームデータ等の知的財産権および著作権は、株式会社カプコン様ならびに各正当な権利保有者に帰属します。当サイトは株式会社カプコン様の定める「カプコン著作物に関するガイドライン」を尊重して運営を行っております。
            </div>
            <p>
              権利者様よりコンテンツに関する削除や修正の申し入れがあった場合は、内容を確認のうえ、速やかに適切な対応を行います。
            </p>
          </div>
        </section>

        {/* 2. 取得する情報 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <UserCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <h2>2. 取得する個人情報および利用者情報</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>当サイトは、サービスの円滑な提供のために以下の情報を取得・保持する場合があります。</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>アカウント・認証情報：</strong>
                会員登録またはログイン時にご提供いただくメールアドレス、パスワード（不可逆な暗号化ハッシュにより保存）、および外部ID連携（Google等のOAuth認証）を利用した際に提供される一意のアカウント識別子。
              </li>
              <li>
                <strong>サービスの利用・購買履歴：</strong>
                会員種別（無料会員 / プレミアム会員）、個別有料記事の購入履歴、登録日時、ログイン日時など。
              </li>
              <li>
                <strong>お問い合わせ情報：</strong>
                お問い合わせフォームから送信されたお名前、メールアドレス、およびお問い合わせ内容。
              </li>
              <li>
                <strong>アクセスログ・Cookie情報：</strong>
                当サイトへのアクセス時に自動的に記録されるIPアドレス、ブラウザ種別、参照元URL、Cookie（クッキー）等。
              </li>
            </ul>

            {/* クレジットカード情報の非保持化明記 */}
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm">
                <CreditCard className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>クレジットカード情報の非保持化について（安全な決済処理）</span>
              </div>
              <p className="text-xs text-emerald-900/80 dark:text-emerald-200 leading-relaxed">
                有料記事の購入およびプレミアム会員（月額サブスクリプション）の決済は、国際的なセキュリティ規格「PCI DSS」に準拠した決済代行事業者<strong>「Stripe（Stripe, Inc.）」</strong>を通じて直接安全に処理されます。
                <strong>お客様のクレジットカード番号、有効期限、セキュリティコード等はStripe社の堅牢なシステム上で直接管理され、当サイトのサーバーには一切保持・保存されません。</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 3. 利用目的 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <Bell className="w-5 h-5 text-indigo-500 shrink-0" />
            <h2>3. 個人情報の利用目的</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>当サイトは、取得した個人情報を以下の目的の範囲内でのみ適切に利用します。</p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>会員登録の受付、ユーザー認証、およびマイページ機能の提供のため</li>
              <li>プレミアム会員限定記事、個別購入記事、逆引きリーサルツール等の閲覧権限管理のため</li>
              <li>有料サービスの課金処理、請求管理、および領収書等の決済通知発行のため</li>
              <li>サービスに関する重要なお知らせ（メンテナンス、規約改定、機能追加等）のご連絡のため</li>
              <li>ユーザーからのお問い合わせ対応、サポート、およびご本人確認のため</li>
              <li>不正利用、アカウントの不正共有、規約違反行為の調査および防止のため</li>
              <li>サービスの利用状況分析によるコンテンツ改善および新機能開発のため</li>
            </ol>
          </div>
        </section>

        {/* 4. 第三者提供および外部委託 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <h2>4. 個人情報の第三者提供および委託</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              当サイトは、以下の場合を除き、あらかじめご本人の同意を得ることなく個人情報を第三者に提供することはありません。
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>法令に基づく開示請求（裁判所、警察等の公的機関からの正式な要請）があった場合</li>
              <li>人の生命、身体または財産の保護のために緊急の必要があり、本人の同意を得ることが困難である場合</li>
            </ul>
            <p className="pt-2">
              なお、サービスの安定した運用のために、信頼できる以下の外部クラウド・代行サービスへ業務の一部を委託しています。委託先は適切な個人情報保護体制を備えた事業者に限定しています。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs">
                <span className="font-bold text-neutral-900 dark:text-white block mb-0.5">Stripe, Inc.</span>
                <span className="text-neutral-500 dark:text-neutral-400">オンライン決済の代行処理およびサブスクリプション管理</span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs">
                <span className="font-bold text-neutral-900 dark:text-white block mb-0.5">Supabase, Inc. / Vercel, Inc.</span>
                <span className="text-neutral-500 dark:text-neutral-400">認証基盤、暗号化データベース、ホスティングインフラの提供</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 安全管理措置 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <h2>5. 個人情報の安全管理措置</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              当サイトは、取り扱う個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じています。
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>SSL/TLS暗号化通信：</strong>当サイトとのすべての通信は強固なSSL/TLSにより常時暗号化されています。</li>
              <li><strong>パスワードの不可逆暗号化：</strong>パスワードは不可逆なハッシュ関数により安全に保存され、運営者であっても復元できない構造になっています。</li>
              <li><strong>アクセス権限の最小化：</strong>個人データへのアクセスは、サービス保守・問い合わせ対応に必要な最小限の運用者に限定しています。</li>
            </ul>
          </div>
        </section>

        {/* 6. 開示・訂正・利用停止・退会（個人情報削除） */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <Trash2 className="w-5 h-5 text-rose-500 shrink-0" />
            <h2>6. 個人情報の開示・訂正・利用停止・退会（削除手続き）</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              ユーザーは、当サイトに対してご自身の個人情報の開示、訂正、追加、削除、利用停止、またはアカウントの完全な削除（退会）を請求することができます。
            </p>
            <p>
              手続きをご希望の場合は、ご本人様確認のため、ご登録時のメールアドレスを添えて<Link href="/contact" className="text-cyan-600 dark:text-cyan-400 underline font-bold">お問い合わせフォーム</Link>よりご連絡ください。ご本人確認を行ったうえで、法令に従い速やかに対応いたします。
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs">
              ※ 定期購読（プレミアム会員）をご利用中のお客様は、退会手続きの前にサブスクリプションの自動更新停止が必要となります。解約方法の詳細は<Link href="/membership" className="text-cyan-600 dark:text-cyan-400 underline">会員案内ページ</Link>または<Link href="/legal/tokusho" className="text-cyan-600 dark:text-cyan-400 underline">特定商取引法に基づく表記</Link>をご確認ください。
            </p>
          </div>
        </section>

        {/* 7. Google Analytics (GA4) と Cookie について */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <Globe className="w-5 h-5 text-[#00a3c4] shrink-0" />
            <h2>7. アクセス解析ツール（Google Analytics 4）の利用について</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              当サイトでは、サービスの向上および利便性改善を目的として、Google社が提供するアクセス解析ツール「Google Analytics 4（GA4）」を利用しています。
            </p>
            <p>
              Google Analyticsはデータ収集のために「Cookie（クッキー）」を使用しています。このトラフィックデータは匿名で収集されており、氏名、住所、電話番号などの個人を特定する情報は一切含まれません。
            </p>
            <p>
              利用者は、ご使用のブラウザ設定によりCookieを無効化することで、データの収集を拒否することができます。Google Analyticsの利用規約およびプライバシーポリシーの詳細は、Google社の公式ページをご確認ください。
            </p>
          </div>
        </section>

        {/* 8. 広告配信・アフィリエイトプログラムに関する表記 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
            <h2>8. 広告配信およびアフィリエイトプログラムについて</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
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

        {/* 9. 免責事項および利用規約 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-black text-base sm:text-lg border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <Scale className="w-5 h-5 text-neutral-700 dark:text-neutral-300 shrink-0" />
            <h2>9. 免責事項および利用規約の遵守</h2>
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3">
            <p>
              <strong>【攻略情報に関する免責】</strong><br />
              当サイトに掲載されている情報（コンボダメージ、フレームデータ、起き攻め状況等）については、筆者の実戦検証および公式情報に基づき正確を期すよう努めておりますが、ゲームのバージョンアップデートやパッチ適用、仕様変更により、一時的に実際の挙動と異なる場合がございます。当サイト運営者に故意または重大な過失がある場合を除き、当サイトの利用に関して生じた損害について運営者は責任を負いかねます。
            </p>
            <p>
              <strong>【利用規約の遵守・アカウント共有の禁止】</strong><br />
              当サイトのすべてのサービスのご利用にあたっては、別途定める<Link href="/legal/terms" className="text-cyan-600 dark:text-cyan-400 underline font-bold mx-1">利用規約（Terms of Service）</Link>が適用されます。有料記事やツールの無断転載・再配布、および1つのアカウントを複数人で共有・使い回す行為は固く禁止されており、違反が確認された場合はアカウントの停止措置等を講じます。
            </p>
          </div>
        </section>

        {/* 10. プライバシーポリシーの改定 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <h2 className="font-black text-base text-neutral-900 dark:text-white">10. 本ポリシーの変更・改定</h2>
          <p className="leading-relaxed">
            当サイトは、保有する個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。修正された最新のプライバシーポリシーは、本ページへの掲載をもって効力を生じるものとします。
          </p>
        </section>

        {/* 11. お問い合わせ窓口 */}
        <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-xs space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <h2 className="font-black text-base text-neutral-900 dark:text-white">11. お問い合わせ窓口</h2>
          <p className="leading-relaxed">
            本ポリシーに関するご質問、個人情報の開示・訂正・削除のご請求、その他お問い合わせは、当サイトの
            <Link href="/contact" className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold mx-1">
              お問い合わせフォーム
            </Link>
            よりご連絡ください。
          </p>
          <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-400">
            事業者情報および特定商取引法に関する詳細は、
            <Link href="/legal/tokusho" className="text-neutral-700 dark:text-neutral-300 underline font-medium">
              特定商取引法に基づく表記
            </Link>
            をご確認ください。
          </div>
        </section>
      </main>
    </div>
  );
}
