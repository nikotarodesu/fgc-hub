export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-[#f0f9fb] text-neutral-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-sky-100 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 mb-8 pb-4 border-b border-neutral-200">
            特定商取引法に基づく表記
          </h1>

          <div className="space-y-4 text-sm text-neutral-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">販売事業者名</div>
              <div className="sm:col-span-2 font-medium">にこ太郎（nikotaro）</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">サイトURL</div>
              <div className="sm:col-span-2 font-mono font-medium text-[#008ba8]">https://nikotaro.com</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">お問い合わせ先</div>
              <div className="sm:col-span-2 leading-relaxed">
                <a
                  href="https://x.com/nikotarosun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#00a3c4] hover:underline"
                >
                  公式X（@nikotarosun）のダイレクトメッセージ
                </a>
                <span className="block text-xs text-neutral-500 mt-1">
                  ※ メールアドレス等についてご請求があった場合は、特定商取引法に基づき遅滞なく電子メール等にて開示いたします。
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 border-b border-neutral-100">
              <div className="font-bold text-neutral-500">販売価格</div>
              <div className="sm:col-span-2">各記事詳細ページおよびマガジン案内ページに表示（税込価格）</div>
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
              <div className="font-bold text-neutral-500">返品・キャンセルについて</div>
              <div className="sm:col-span-2 leading-relaxed">
                デジタルコンテンツの性質上、決済完了後の返金・返品は原則としてお受けできません。定期購読（月額マガジン）はマイページよりいつでも次回以降の更新を停止・解約いただけます。
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
