import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-sky-100 text-neutral-600 text-xs mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-neutral-900 bg-[#00a3c4]">
                <Image
                  src="/icon.png"
                  alt="にこ太郎"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-neutral-900 text-base">にこ太郎の格ゲーLAB</span>
            </div>
            <p className="text-neutral-500 leading-relaxed max-w-md">
              ストリートファイター6全キャラ1800MR以上の筆者「にこ太郎」による攻略メディア。対戦リプレイ添削、フレームデータ、実戦セットプレイ、共通上達論を発信しています。
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-700 hover:text-[#00a3c4] font-medium"
              >
                <span>公式X (@nikotaro)</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
              <span className="text-neutral-300">|</span>
              <a
                href="https://note.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-700 hover:text-[#00a3c4] font-medium"
              >
                <span>note公式ページ</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-3">カテゴリ</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="/sf6" className="hover:text-[#00a3c4] font-bold text-[#00a3c4]">⚡ スト6攻略DBツール (New)</Link></li>
              <li><Link href="/?game=sf6" className="hover:text-[#00a3c4]">ストリートファイター6 攻略記事</Link></li>
              <li><Link href="/?game=general" className="hover:text-[#00a3c4]">格ゲー共通上達論・メンタル</Link></li>
              <li><Link href="/membership" className="hover:text-[#00a3c4]">月額マガジン案内</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 mb-3">法務・免責事項</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="/privacy" className="hover:text-[#00a3c4] font-medium text-neutral-700">プライバシーポリシー &amp; 免責事項</Link></li>
              <li><Link href="/legal/tokusho" className="hover:text-[#00a3c4]">特定商取引法に基づく表記</Link></li>
              <li>
                <div className="flex items-center gap-1 text-emerald-700 mt-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Stripe暗号化決済導入</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} にこ太郎の格ゲーLAB (nikotaro.com). All rights reserved.</p>
          <p>※ 本サイトは個人の非公式攻略メディアであり、株式会社カプコンの公式サービスではありません。ゲーム内著作物の権利は各著作権元に帰属します。</p>
        </div>
      </div>
    </footer>
  );
}
