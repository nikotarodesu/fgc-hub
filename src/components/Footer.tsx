import Link from 'next/link';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-600 text-xs mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-900 text-sm">FGC LAB（格ゲー攻略ラボ）</span>
            </div>
            <p className="text-neutral-500 leading-relaxed max-w-md">
              ストリートファイター6から将来のストリートファイター7まで、不変の対戦理論・フレームデータ・実戦セットプレイを発信する攻略メディア。最高MR2080到達者による勝率直結のノウハウをお届けします。
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900"
              >
                <span>公式X (@nikotaro)</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
              <span className="text-neutral-300">|</span>
              <a
                href="https://note.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900"
              >
                <span>note公式ページ</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">カテゴリ</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="/?game=sf6" className="hover:text-neutral-900">ストリートファイター6 攻略</Link></li>
              <li><Link href="/?game=general" className="hover:text-neutral-900">格ゲー共通上達論・メンタル</Link></li>
              <li><Link href="/?game=sf7" className="hover:text-neutral-900">スト7展望・新システム考察</Link></li>
              <li><Link href="/membership" className="hover:text-neutral-900">月額マガジン案内</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-3">特定商取引・規約</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="/legal/tokusho" className="hover:text-neutral-900">特定商取引法に基づく表記</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-neutral-900">プライバシーポリシー</Link></li>
              <li>
                <div className="flex items-center gap-1 text-emerald-700 mt-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Stripe暗号化決済導入</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} FGC LAB by nikotaro. All rights reserved.</p>
          <p>※ 本サイトは個人の攻略メディアであり、株式会社カプコンの公式サービスではありません。</p>
        </div>
      </div>
    </footer>
  );
}
