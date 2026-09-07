'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES_DATA, CHARACTERS_SF6, AUTHOR_INFO } from '@/data/articles';
import { Search, Flame, BookOpen, Lock, ArrowRight, TrendingUp, Tag, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<'all' | 'sf6' | 'general'>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // すべてのタグを収集
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    ARTICLES_DATA.forEach((a) => a.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  // フィルタリング処理
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      if (selectedGame !== 'all' && article.game !== selectedGame) return false;
      if (selectedCharacter && article.character !== selectedCharacter) return false;
      if (selectedTag && !article.tags.includes(selectedTag)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(query);
        const matchSummary = article.summary.toLowerCase().includes(query);
        const matchTags = article.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchTitle && !matchSummary && !matchTags) return false;
      }
      return true;
    });
  }, [selectedGame, selectedCharacter, selectedTag, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f0f9fb] text-neutral-900">
      {/* ヒーローセクション：アイコンのシアンブルーを活かしたポップ＆プロフェッショナルなデザイン */}
      <section className="bg-white border-b-2 border-sky-100 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a3c4]/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {/* にこ太郎アイコンを主役に配置！ */}
            <div className="relative shrink-0 group">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-neutral-900 shadow-xl bg-[#00a3c4] p-1">
                <Image
                  src="/icon.png"
                  alt="にこ太郎 アイコン"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-1 bg-neutral-900 text-white text-[11px] font-black px-2.5 py-1 rounded-full border-2 border-white shadow-md">
                全キャラ1800MR+
              </div>
            </div>

            {/* テキストエリア */}
            <div className="text-center sm:text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-[#008ba8] text-xs font-bold mb-3 border border-sky-200">
                <span>にこ太郎の公式格ゲー攻略メディア（nikotaro.com）</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight mb-3">
                にこ太郎の格ゲーLAB
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
                全キャラ1800MR以上の筆者による、勝率直結のスト6実践攻略。<br className="hidden sm:inline" />
                動画付きリプレイ添削、フレーム完璧なセットプレイ、一生役立つ普遍的な格ゲー上達理論をお届けします。
              </p>
            </div>
          </div>

          {/* 検索バー */}
          <div className="mt-8 max-w-xl relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="記事タイトル・キャラクター・技名で検索..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 border-2 border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#00a3c4] focus:bg-white transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-semibold"
              >
                クリア
              </button>
            )}
          </div>
        </div>
      </section>

      {/* メインレイアウト（2カラム） */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ゲーム切り替えタブ */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-sky-200/60">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => { setSelectedGame('all'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGame === 'all'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              全記事一覧
            </button>
            <button
              onClick={() => { setSelectedGame('sf6'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGame === 'sf6'
                  ? 'bg-[#00a3c4] text-white shadow-md shadow-sky-500/20'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>ストリートファイター6</span>
            </button>
            <button
              onClick={() => { setSelectedGame('general'); setSelectedCharacter(null); setSelectedTag(null); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGame === 'general'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-500" />
              <span>共通上達論・メンタル</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500 font-semibold">
            全 <span className="text-[#00a3c4] font-black">{filteredArticles.length}</span> 件
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* メイン記事カラム（8 / 12） */}
          <div className="lg:col-span-8 space-y-5">
            {/* 絞り込み条件 */}
            {(selectedCharacter || selectedTag || searchQuery) && (
              <div className="p-3.5 rounded-xl bg-white border border-sky-200 flex items-center justify-between text-xs shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-medium">絞り込み:</span>
                  {selectedCharacter && (
                    <span className="bg-[#00a3c4]/10 text-[#008ba8] font-bold px-2.5 py-0.5 rounded-full border border-[#00a3c4]/20">
                      キャラ: {selectedCharacter}
                    </span>
                  )}
                  {selectedTag && (
                    <span className="bg-neutral-100 text-neutral-800 font-bold px-2 py-0.5 rounded">
                      #{selectedTag}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-neutral-100 text-neutral-800 font-bold px-2 py-0.5 rounded">
                      &quot;{searchQuery}&quot;
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setSelectedCharacter(null); setSelectedTag(null); setSearchQuery(''); }}
                  className="text-neutral-500 hover:text-neutral-900 underline font-semibold cursor-pointer"
                >
                  解除
                </button>
              </div>
            )}

            {/* 記事カード一覧 */}
            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 text-neutral-500 text-sm">
                該当する記事が見つかりませんでした。別の条件でお試しください。
              </div>
            ) : (
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group block p-6 bg-white rounded-2xl border-2 border-neutral-200/80 hover:border-[#00a3c4] hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-neutral-500 uppercase">
                          {article.game === 'sf6' ? 'スト6' : '共通理論'}
                        </span>
                        {article.character && (
                          <span className="text-[11px] font-bold text-neutral-800 bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-full">
                            {article.character}
                          </span>
                        )}
                        {article.youtubeVideoId && (
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span>▶ 動画付き</span>
                          </span>
                        )}
                      </div>
                      {article.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-neutral-900 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full">
                          <Lock className="w-3 h-3 text-amber-800" />
                          <span>¥{article.price}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          無料公開中
                        </span>
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-black text-neutral-900 group-hover:text-[#00a3c4] transition-colors mb-2 leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                      {article.summary}
                    </p>

                    <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-2 text-neutral-600">
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-neutral-900 bg-[#00a3c4] inline-block">
                          <Image src="/icon.png" alt="にこ太郎" width={20} height={20} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-neutral-800">{article.author.name}</span>
                        <span>・</span>
                        <span>{article.publishedAt}</span>
                        <span>・</span>
                        <span>読了 {article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#00a3c4] font-black group-hover:translate-x-1 transition-transform">
                        <span>読む</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 右サイドバー（4 / 12） */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 著者プロフィールカード */}
            <div className="p-5 bg-white rounded-2xl border-2 border-sky-100 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-neutral-900 mx-auto mb-3 bg-[#00a3c4] shadow-md">
                <Image
                  src="/icon.png"
                  alt="にこ太郎"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-black text-base text-neutral-900">{AUTHOR_INFO.name}</h3>
              <div className="inline-block text-[11px] font-bold text-[#008ba8] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full my-1">
                {AUTHOR_INFO.mrRating}
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed mt-2 text-left">
                {AUTHOR_INFO.bio}
              </p>
            </div>

            {/* スト6 キャラクター別クイックアクセス */}
            <div className="p-5 bg-white rounded-2xl border border-neutral-200">
              <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>スト6 キャラクター別攻略</span>
              </h3>
              <div className="grid grid-cols-2 gap-1.5">
                {CHARACTERS_SF6.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedGame('sf6');
                      setSelectedCharacter(selectedCharacter === char.name ? null : char.name);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCharacter === char.name
                        ? 'bg-[#00a3c4] text-white shadow-sm'
                        : 'bg-neutral-50 text-neutral-700 hover:bg-sky-50 hover:text-[#008ba8]'
                    }`}
                  >
                    {char.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* 人気記事ランキング */}
            <div className="p-5 bg-white rounded-2xl border border-neutral-200">
              <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#00a3c4]" />
                <span>注目・人気記事</span>
              </h3>
              <div className="space-y-3">
                {ARTICLES_DATA.map((art, idx) => (
                  <Link
                    key={art.id}
                    href={`/articles/${art.slug}`}
                    className="flex items-start gap-2.5 group"
                  >
                    <span className="font-mono font-black text-xs text-neutral-400 group-hover:text-[#00a3c4] shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800 group-hover:text-[#00a3c4] line-clamp-2 leading-snug">
                        {art.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400">
                        {art.isPaid ? `¥${art.price}・有料` : '無料'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* タグクラウド */}
            <div className="p-5 bg-white rounded-2xl border border-neutral-200">
              <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-neutral-600" />
                <span>トピック</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-[#00a3c4] text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 月額マガジンCTAカード */}
            <div className="p-5 bg-gradient-to-br from-[#00a3c4] to-sky-700 text-white rounded-2xl shadow-lg shadow-sky-500/20">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-2">
                MEMBERSHIP
              </span>
              <h3 className="text-base font-black text-white mb-1.5">
                月額マガジンで読み放題
              </h3>
              <p className="text-xs text-sky-100 leading-relaxed mb-4">
                月額¥980でスト6全キャラ攻略＆実戦添削がすべて読み放題。noteよりお得に最新版を購読できます。
              </p>
              <Link
                href="/membership"
                className="block w-full py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#008ba8] text-xs font-black text-center shadow-sm transition-transform active:scale-98"
              >
                マガジン詳細を見る
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
