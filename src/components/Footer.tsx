import Link from 'next/link';
import { ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* ブランド概要 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-extrabold text-white text-base">FGC LAB（格ゲー攻略ラボ）</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              ストリートファイター6から将来のストリートファイター7まで、不変の対戦理論・フレームデータ・実戦的セットプレイを発信する格闘ゲーム特化メディア。最高MR2080到達者が実戦で培った勝率直結のノウハウをお届けします。
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>公式X (@nikotaro)</span>
              </a>
              <a
                href="https://note.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors"
              >
                <span>note公式ページ</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* コンテンツナビ */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">カテゴリ</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/?game=sf6" className="hover:text-white transition-colors">ストリートファイター6 攻略</Link></li>
              <li><Link href="/?game=general" className="hover:text-white transition-colors">格ゲー共通上達論・メンタル</Link></li>
              <li><Link href="/?game=sf7" className="hover:text-white transition-colors">スト7展望・新システム考察</Link></li>
              <li><Link href="/membership" className="hover:text-white transition-colors">月額マガジン案内</Link></li>
            </ul>
          </div>

          {/* 法的表記・安心設計 */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">特定商取引・法務</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/legal/tokusho" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors">利用規約</Link></li>
              <li>
                <div className="flex items-center gap-1 text-emerald-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Stripe安全暗号化決済</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} FGC LAB by nikotaro. All rights reserved.</p>
          <p>※ 本サイトは個人の攻略メディアであり、株式会社カプコンの公式サービスではありません。</p>
        </div>
      </div>
    </footer>
  );
}
