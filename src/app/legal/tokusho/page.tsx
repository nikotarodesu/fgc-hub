export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-8 pb-4 border-b border-neutral-800">
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-6 text-sm text-neutral-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-800/60">
            <div className="font-bold text-neutral-400">販売事業者名</div>
            <div className="sm:col-span-2">nikotaro（個人事業主）</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-800/60">
            <div className="font-bold text-neutral-400">連絡先メールアドレス</div>
            <div className="sm:col-span-2">gomadouhu.k@gmail.com</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-800/60">
            <div className="font-bold text-neutral-400">販売価格</div>
            <div className="sm:col-span-2">各記事詳細ページおよびマガジン案内ページに表示（税込価格）</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-800/60">
            <div className="font-bold text-neutral-400">商品代金以外の必要料金</div>
            <div className="sm:col-span-2">インターネット接続料金、通信料金等はお客様のご負担となります。</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-800/60">
            <div className="font-bold text-neutral-400">お支払い方法</div>
            <div className="sm:col-span-2">クレジットカード決済（Stripe）</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-800/60">
            <div className="font-bold text-neutral-400">役務の提供時期</div>
            <div className="sm:col-span-2">クレジットカード決済完了後、即時にWebブラウザ上で閲覧可能となります。</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-800/60">
            <div className="font-bold text-neutral-400">返品・キャンセルについて</div>
            <div className="sm:col-span-2">
              デジタルコンテンツの性質上、決済完了後の返金・返品は原則としてお受けできません。定期購読（月額マガジン）はマイページよりいつでも次回以降の更新を停止・解約いただけます。
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
