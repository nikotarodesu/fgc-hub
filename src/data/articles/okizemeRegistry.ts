// キャラクター別起き攻めデータ共通リゾルバ
// 最重要ルール：
// - 現在開いている記事のキャラクターに紐づくデータのみを参照
// - 別キャラクターへのフォールバックは絶対に行わない
// - データがない場合は安全に null を返す

import { FrameOkizemeData, findOkizemeData as findRyuOkizemeData } from './ryuOkizemeData';
import { findElenaOkizemeData } from './elenaOkizemeData';
import { findChunliOkizemeData } from './chunliOkizemeData';

export type { FrameOkizemeData };

export function getOkizemeDataByCharacter(
  character: string | undefined,
  rawStr: string
): FrameOkizemeData | null {
  if (!character || !rawStr) return null;

  if (character === 'リュウ') {
    return findRyuOkizemeData(rawStr);
  }

  if (character === 'エレナ') {
    return findElenaOkizemeData(rawStr);
  }

  if (character === '春麗') {
    return findChunliOkizemeData(rawStr);
  }

  // 他キャラクターへのフォールバックは一切行わない
  return null;
}
