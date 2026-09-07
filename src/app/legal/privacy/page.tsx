export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-8 pb-4 border-b border-neutral-800">
          プライバシーポリシー
        </h1>
        <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
          <p>
            FGC LAB（以下「当サイト」）は、ユーザーの個人情報の保護を重要視し、以下の方針に基づいて適切に取り扱います。
          </p>
          <h2 className="text-lg font-bold text-white mt-6 mb-2">1. 収集する情報</h2>
          <p>
            有料記事の購入時やマガジン登録時に、メールアドレスおよび決済情報（クレジットカード番号等はStripeが安全に処理し、当サイトサーバーには保存されません）を取得します。
          </p>
          <h2 className="text-lg font-bold text-white mt-6 mb-2">2. 利用目的</h2>
          <p>
            取得した情報は、有料コンテンツの提供、購入履歴の管理、重要なお知らせの送信、およびサービス向上のための分析に利用します。
          </p>
          <h2 className="text-lg font-bold text-white mt-6 mb-2">3. 第三者提供</h2>
          <p>
            法令に基づく場合を除き、事前の同意なく個人情報を第三者に提供することはありません。
          </p>
        </div>
      </main>
    </div>
  );
}
