'use client';

import React from 'react';
import { DeviceProduct } from '@/data/devices/types';
import { ArrowDown } from 'lucide-react';

interface DeviceComparisonTableProps {
  products: DeviceProduct[];
}

export default function DeviceComparisonTable({ products }: DeviceComparisonTableProps) {
  if (products.length === 0) return null;

  return (
    <div className="my-8 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
          候補製品の比較一覧
        </h3>
        <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
          ※横スクロールで全体を表示できます
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xs">
        <table className="w-full text-xs text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800">
              <th className="py-3 px-4 font-bold text-neutral-800 dark:text-neutral-200 w-1/4">
                製品名
              </th>
              <th className="py-3 px-4 font-bold text-neutral-800 dark:text-neutral-200 w-1/6">
                対応環境
              </th>
              <th className="py-3 px-4 font-bold text-neutral-800 dark:text-neutral-200 w-1/4">
                おすすめ用途
              </th>
              <th className="py-3 px-4 font-bold text-neutral-800 dark:text-neutral-200 w-1/4">
                主な特徴
              </th>
              <th className="py-3 px-4 font-bold text-neutral-800 dark:text-neutral-200 w-16 text-center">
                詳細
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
              >
                <td className="py-3 px-4 font-bold text-neutral-900 dark:text-white align-top">
                  <div className="space-y-1">
                    <div>{p.name}</div>
                    {p.badge && (
                      <span className="inline-block text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                        {p.badge}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300 align-top">
                  {p.compatibility.join(', ')}
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300 align-top leading-relaxed">
                  {p.targetUser}
                </td>
                <td className="py-3 px-4 text-neutral-600 dark:text-neutral-300 align-top">
                  <ul className="space-y-1">
                    {p.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-500 shrink-0">✓</span>
                        <span className="line-clamp-2">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4 text-center align-top">
                  <a
                    href={`#${p.id}`}
                    className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold transition-colors"
                    title={`${p.name}の解説へ移動`}
                  >
                    <span>解説</span>
                    <ArrowDown className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
