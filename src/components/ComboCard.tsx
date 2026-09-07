import { Swords, Gauge } from 'lucide-react';

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
    <div className="my-4 rounded-xl bg-white border border-neutral-200 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-neutral-700" />
          <span className="font-bold text-sm text-neutral-900">{name}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono font-semibold">
            DMG: {damage}
          </span>
          <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono font-medium flex items-center gap-1">
            <Gauge className="w-3 h-3 text-neutral-500" />
            {driveGauge}
          </span>
        </div>
      </div>

      {/* コンボレシピ */}
      <div className="bg-neutral-900 text-neutral-100 px-3.5 py-2.5 rounded-lg font-mono text-xs sm:text-sm border border-neutral-800 mb-3 overflow-x-auto tracking-wide">
        {recipe}
      </div>

      {/* 状況 & 解説 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div>
          <span className="text-neutral-400 font-medium block text-[10px] uppercase">発動状況</span>
          <span className="text-neutral-700">{situation}</span>
        </div>
        <div className="sm:col-span-2">
          <span className="text-neutral-400 font-medium block text-[10px] uppercase">解説 & コツ</span>
          <span className="text-neutral-700">{note}</span>
        </div>
      </div>
    </div>
  );
}
