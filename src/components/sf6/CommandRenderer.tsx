'use client';

import React from 'react';
import { DirectionIcon, ButtonBadge } from './CommandIcon';
import { ChevronRight } from 'lucide-react';

interface CommandRendererProps {
  recipe: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 1つのアクション（例: "2MK", "OD 236KK", "5HK(PC)", "DR", "SA3"）をパースして描画する
 */
function SingleActionItem({ token }: { token: string }) {
  const trimmed = token.trim();
  if (!trimmed) return null;

  // 特別なキーワード単体
  if (['DR', 'OD', 'DI', 'DP', 'PC', 'SA1', 'SA2', 'SA3', 'CA'].includes(trimmed.toUpperCase())) {
    return <ButtonBadge btn={trimmed} />;
  }

  // ディレイ表記
  if (trimmed.toLowerCase() === 'dl' || trimmed.toLowerCase() === 'delay') {
    return (
      <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-100 px-1 py-0.5 rounded">
        微ディレイ
      </span>
    );
  }

  // ジャンプ攻撃 (j.HK など)
  let isJump = false;
  let workToken = trimmed;
  if (workToken.toLowerCase().startsWith('j.')) {
    isJump = true;
    workToken = workToken.substring(2);
  }

  // パニカン注記 (PC) の有無
  let isPunishCounter = false;
  if (workToken.includes('(PC)') || workToken.includes('(pc)')) {
    isPunishCounter = true;
    workToken = workToken.replace(/\(PC\)|\(pc\)/g, '');
  }

  // ODなどの前置詞がある場合 (例: "OD 236KK" -> ["OD", "236KK"])
  const subTokens = workToken.split(/\s+/).filter(Boolean);
  if (subTokens.length > 1) {
    return (
      <span className="inline-flex items-center gap-1">
        {subTokens.map((st, i) => (
          <SingleActionItem key={i} token={st} />
        ))}
        {isPunishCounter && <ButtonBadge btn="PC" />}
      </span>
    );
  }

  // 単一の複合トークン (例: "2MK", "236HK", "4HP", "5LP", "623HP")
  // 正規表現で [タメまたはモーションまたは方向数字] + [ボタン] を抽出
  // 例: (236236|236|214|623|421|\[4\]6|\[2\]8|[1-9])?([A-Za-z]+|\d[PK])
  const match = workToken.match(/^(\[4\]6|\[2\]8|236236|214214|236|214|623|421|[1-9])?([A-Za-z]+|\d[PK])?$/);

  if (match) {
    const dir = match[1];
    const btn = match[2];

    return (
      <span className="inline-flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        {isJump && (
          <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1 py-0.2 rounded">
            J
          </span>
        )}
        {dir && dir !== '5' && (
          <span className="text-neutral-700 flex items-center justify-center">
            <DirectionIcon dir={dir} />
          </span>
        )}
        {dir === '5' && (
          <span className="text-[10px] text-neutral-400 font-medium">立</span>
        )}
        {btn && <ButtonBadge btn={btn} />}
        {isPunishCounter && <ButtonBadge btn="PC" />}
      </span>
    );
  }

  // パースできなかった場合の安全なフォールバック
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 text-xs font-semibold bg-white rounded border border-neutral-200 text-neutral-800">
      {trimmed}
    </span>
  );
}

export default function CommandRenderer({ recipe, className = '' }: CommandRendererProps) {
  // ">" または "→" で分割
  const steps = recipe
    .split(/>|→/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className={`flex flex-wrap items-center gap-1.5 text-sm ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <SingleActionItem token={step} />
          {index < steps.length - 1 && (
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0 mx-0.5" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
