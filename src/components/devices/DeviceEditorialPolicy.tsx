import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function DeviceEditorialPolicy() {
  return (
    <aside
      aria-label="掲載方針・広告表記"
      className="mt-12 p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 space-y-2"
    >
      <div className="flex items-center gap-1.5 font-bold text-neutral-700 dark:text-neutral-300">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>掲載方針・広告表記について</span>
      </div>
      <p className="leading-relaxed">
        本コーナーの記事では、Amazonアソシエイトなどのアフィリエイト広告リンクを利用しています。商品の推薦や評価は公式仕様・実戦知見・客観的データに基づいており、報酬の多寡によって掲載順位や推薦理由を歪めることはありません。
      </p>
      <p className="leading-relaxed text-[11px] text-neutral-400 dark:text-neutral-500">
        当記事ではAmazonアソシエイトなどのアフィリエイト広告を利用しています。紹介する基準や注意点は公式仕様および著者の実戦経験に基づき公平に記載しています。
      </p>
    </aside>
  );
}
