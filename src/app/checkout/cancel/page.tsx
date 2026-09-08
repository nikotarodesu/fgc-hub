import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#f8fafc]">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-sm text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
          決済がキャンセルされました
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
          お支払いは中断されました。請求は一切発生しておりません。ご不明な点がございましたら公式XのDMまでお気軽にお問い合わせください。
        </p>

        <div className="space-y-2.5">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
          >
            トップページへ戻る
          </Link>
          <Link
            href="/membership"
            className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
          >
            月額マガジン案内を見る
          </Link>
        </div>
      </div>
    </div>
  );
}