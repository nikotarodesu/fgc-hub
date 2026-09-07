'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ARTICLES_DATA, CHARACTERS_SF6 } from '@/data/articles';
import { Flame, BookOpen, Sparkles, Lock, ArrowRight, Star, Trophy, Users, ShieldAlert } from 'lucide-react';

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<'all' | 'sf6' | 'general' | 'sf7'>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const filteredArticles = ARTICLES_DATA.filter((article) => {
    if (selectedGame !== 'all' && article.game !== selectedGame) return false;
    if (selectedCharacter && article.character !== selectedCharacter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950 pt-12 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* 実績バッジ */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-amber-500/30 text-xs text-amber-300 mb-6 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>最高MR2080到達者による実践的勝率直結メソッド</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
              勝率を引き上げる、<br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-400 bg-clip-text text-transparent">
                格闘ゲーム攻略メディア
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 mb-8 leading-relaxed">
              『ストリートファイター6』のフレーム完璧なセットプレイ・キャラ対策から、一生役立つ普遍的な格ゲー上達理論、そして将来の『スト7』へ続く攻略ナレッジを蓄積・発信しています。
            </p>

            {/* 数値ハイライト */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">MR 2080</div>
                <div className="text-xs text-neutral-400">最高到達レート</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-orange-400">1,000+ 部</div>
                <div className="text-xs text-neutral-400">note有料記事販売</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">スト6 → スト7</div>
                <div className="text-xs text-neutral-400">長期資産化メディア</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ゲーム切り替えタブ */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => { setSelectedGame('all'); setSelectedCharacter(null); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedGame === 'all'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              全記事一覧
            </button>
            <button
              onClick={() => { setSelectedGame('sf6'); setSelectedCharacter(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedGame === 'sf6'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>ストリートファイター6</span>
            </button>
            <button
              onClick={() => { setSelectedGame('general'); setSelectedCharacter(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedGame === 'general'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>格ゲー共通上達論</span>
            </button>
            <button
              onClick={() => { setSelectedGame('sf7'); setSelectedCharacter(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedGame === 'sf7'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>スト7展望・考察</span>
            </button>
          </div>

          <div className="text-xs text-neutral-400">
            全 <span className="text-white font-bold">{filteredArticles.length}</span> 件
          </div>
        </div>

        {/* スト6選択時のキャラクターフィルター */}
        {(selectedGame === 'all' || selectedGame === 'sf6') && (
          <div className="mb-10 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              スト6 キャラクター別攻略
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCharacter(null)}
                className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  selectedCharacter === null
                    ? 'bg-neutral-700 text-white font-bold'
                    : 'bg-neutral-800/80 text-neutral-400 hover:text-white'
                }`}
              >
                全員
              </button>
              {CHARACTERS_SF6.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char.name)}
                  className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                    selectedCharacter === char.name
                      ? 'bg-orange-500 text-black font-bold'
                      : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {char.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 記事一覧カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex flex-col justify-between rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-orange-500/50 hover:bg-neutral-900/90 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1"
            >
              <div>
                {/* カード上部タグ */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 uppercase tracking-wide">
                      {article.game === 'sf6' ? 'STREET FIGHTER 6' : article.game === 'sf7' ? 'STREET FIGHTER 7' : '共通理論'}
                    </span>
                    {article.isPaid ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-600/40">
                        <Lock className="w-3 h-3" />
                        <span>¥{article.price}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                        無料公開
                      </span>
                    )}
                  </div>

                  <h2 className="text-base sm:text-lg font-black text-white group-hover:text-orange-400 transition-colors line-clamp-2 mb-3">
                    {article.title}
                  </h2>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* カードフッター */}
              <div className="px-6 py-4 border-t border-neutral-800/80 bg-neutral-950/40 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span>{article.author.avatar}</span>
                  <span className="font-medium text-neutral-300">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
                  <span>読む</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* noteからの移行者向けCTAセクション */}
        <section className="mt-20 rounded-3xl bg-gradient-to-r from-orange-950/40 via-neutral-900 to-amber-950/30 border border-amber-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-4">
            メディア移行記念
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            note読者の方へ：当サイトでさらに快適な攻略体験を
          </h2>
          <p className="text-sm text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            noteでは表現しきれなかった「フレームデータ表」「コンボレシピのビジュアル表示」「状況別セットプレイ」を独自サイトで完全最適化。スト6はもちろん、今後登場するスト7でも最速の攻略情報を提供していきます。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/articles/sf6-gouki-mr2000-guide"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-black text-sm shadow-lg shadow-orange-500/25 transition-transform hover:scale-105"
            >
              豪鬼MR2000攻略記事を見る
            </Link>
            <Link
              href="/membership"
              className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm transition-colors"
            >
              月額マガジン詳細（¥980/月）
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
