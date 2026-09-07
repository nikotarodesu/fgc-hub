import { Swords, Gauge, Flame, Info } from 'lucide-react';

interface ComboProps {
  name: string;
  recipe: string;
  damage: string;
  driveGauge: string;
  situation: string;
  note: string;
}

export default function ComboCard({ name, recipe, damage, driveGauge, situation, note }: ComboProps) {
  return (
    <div className="my-4 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-800/60">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-orange-500" />
          <span className="font-bold text-sm text-neutral-100">{name}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-800/40 text-red-300 font-mono font-bold">
            DMG: {damage}
          </span>
          <span className="px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300 font-mono font-bold flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            {driveGauge}
          </span>
        </div>
      </div>

      {/* コンボレシピ */}
      <div className="bg-neutral-950 px-3 py-2 rounded-lg font-mono text-xs sm:text-sm text-amber-300 border border-neutral-800/80 mb-2.5 overflow-x-auto tracking-wide">
        {recipe}
      </div>

      {/* 状況 & ワンポイント */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="text-neutral-400">
          <span className="text-neutral-500 font-semibold block text-[10px] uppercase">発動状況</span>
          <span className="text-neutral-200">{situation}</span>
        </div>
        <div className="sm:col-span-2 text-neutral-400">
          <span className="text-neutral-500 font-semibold block text-[10px] uppercase">解説 & コツ</span>
          <span className="text-neutral-300">{note}</span>
        </div>
      </div>
    </div>
  );
}
