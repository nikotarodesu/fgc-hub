import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#f8fafc]">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
          決済が完了しました
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
          にこ太郎の格ゲーLABをご利用いただき誠にありがとうございます。ご購入いただいたコンテンツの閲覧権限が付与されました。
        </p>

        <div className="space-y-2.5">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
          >
            <span>トップページへ戻る</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/sf6"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
          >
            <span>スト6攻略DBツールを開く</span>
          </Link>
        </div>
      </div>
    </div>
  );
}