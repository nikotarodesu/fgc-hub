import Link from 'next/link';
import { Mail, ArrowLeft, Clock, HelpCircle } from 'lucide-react';
import ContactForm from './ContactForm';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'お問い合わせ',
  description:
    'にこ太郎の格ゲーLABへのお問い合わせフォームです。掲載内容・攻略データに関するご質問、コーチング・実戦添削のご相談、取材・お仕事のご依頼などはこちらよりお気軽にお寄せください。',
  canonicalUrl: '/contact',
});

export default function ContactPage() {
  return (
    <div className="min-h-screen py-8 sm:py-20 px-3 sm:px-6 lg:px-8 bg-[#f8fafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
        {/* パンくず・戻るリンク */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>トップページへ戻る</span>
          </Link>
        </div>

        {/* ヘッダー */}
        <div className="text-center space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/80 text-xs font-bold tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            お問い合わせ
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto">
            当サイトへのご質問、掲載内容・攻略データに関するご意見、コーチング・添削のご相談、執筆・取材・お仕事のご依頼など、以下のフォームよりお気軽にお寄せください。
          </p>
        </div>

        {/* フォームコンポーネント */}
        <ContactForm />

        {/* 補足案内（2カラム） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-bold">
              <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>返信までの目安</span>
            </div>
            <p className="leading-relaxed text-neutral-500 dark:text-neutral-400">
              通常、2〜3営業日以内にご入力いただいたメールアドレス宛に回答を差し上げております。内容によってはお時間をいただく場合もございます。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-bold">
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>攻略・キャラ対策のご相談</span>
            </div>
            <p className="leading-relaxed text-neutral-500 dark:text-neutral-400">
              個別のキャラ対策や立ち回りに関するご質問・リクエストは、今後の攻略記事への追記や全体発信テーマとして反映させていただく場合がございます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
