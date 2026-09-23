import Link from 'next/link';

export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-neutral-200/80 shadow-xs">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-8 pb-4 border-b border-neutral-200">
            特定商取引法に基づく表記
          </h1>

          <div className="space-y-4 text-sm text-neutral-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-semibold text-neutral-500">販売事業者名</div>
              <div className="sm:col-span-2 font-medium">にこ太郎（nikotaro）</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-semibold text-neutral-500">サイトURL</div>
              <div className="sm:col-span-2 font-mono font-medium text-neutral-900">https://nikotaro.com</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-semibold text-neutral-500">お問い合わせ先</div>
              <div className="sm:col-span-2 leading-relaxed">
                <Link
                  href="/contact"
                  className="font-medium text-neutral-900 underline hover:text-[#00a3c4]"
                >
                  当サイトのお問い合わせフォーム
                </Link>
                <span className="block text-xs text-neutral-400 mt-1">
                  ※ メールアドレス等についてご請求があった場合は、特定商取引法に基づき遅滞なく電子メール等にて開示いたします。
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">販売価格</div>
              <div className="sm:col-span-2">各記事詳細ページおよびプレミアム会員案内ページに表示（税込価格）</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">商品代金以外の必要料金</div>
              <div className="sm:col-span-2">インターネット接続料金、通信料金等はお客様のご負担となります。</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">お支払い方法</div>
              <div className="sm:col-span-2">クレジットカード決済（Stripe）</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">役務の提供時期</div>
              <div className="sm:col-span-2">クレジットカード決済完了後、即時にWebブラウザ上で閲覧可能となります。</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">定期購入の自動更新と解約</div>
              <div className="sm:col-span-2 leading-relaxed space-y-1.5">
                <p>
                  プレミアム会員プランは月額制の定期購入（サブスクリプション）です。契約締結日より毎月同日に自動更新され、登録されたクレジットカードより月額料金（¥980税込）が自動引き落としされます。
                </p>
                <p>
                  <strong>解約・自動更新の停止：</strong> 次回更新日の前日まで、Stripe決済通知メール内の管理リンク、マイページ、または<Link href="/contact" className="text-[#00a3c4] underline font-medium">お問い合わせフォーム</Link>よりいつでも解約・自動更新停止が可能です。契約期間の縛りや解約手数料・違約金等は一切発生いたしません。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">返品・キャンセル特約</div>
              <div className="sm:col-span-2 leading-relaxed">
                デジタルコンテンツおよびオンラインサービスの性質上、購入・決済完了後の返金、返品、日割り計算による返金は原則としてお受けできません。詳細は<Link href="/legal/terms" className="text-[#00a3c4] underline font-medium">利用規約</Link>をご確認ください。
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
