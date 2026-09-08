import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Home, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#f0f9fb]">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-lg relative overflow-hidden">
        {/* 背景アクセント */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-100/60 rounded-full blur-2xl pointer-events-none" />
        
        {/* アイコン */}
        <div className="relative mx-auto w-20 h-20 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-900 bg-[#00a3c4] shadow-md">
            <Image
              src="/icon.png"
              alt="にこ太郎"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-black shadow-xs">
            !
          </div>
        </div>

        {/* 404 タイトル */}
        <span className="text-xs font-black tracking-widest text-[#00a3c4] uppercase block mb-1">
          Error 404
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2">
          ページが見つかりません
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-8">
          お探しのページは削除されたか、URLが変更された可能性があります。以下のリンクより各攻略ハブへお戻りください。
        </p>

        {/* アクションボタン */}
        <div className="flex flex-col gap-2.5">
          <Link
            href="/sf6"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-black bg-[#00a3c4] hover:bg-[#008ba8] text-white shadow-md transition-all hover:scale-[1.02]"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>スト6攻略ハブへ戻る</span>
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
          >
            <Home className="w-4 h-4 text-neutral-500" />
            <span>総合トップページへ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
