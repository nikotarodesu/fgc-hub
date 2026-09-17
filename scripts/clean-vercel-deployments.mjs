import fs from 'node:fs';
import path from 'node:path';

// .env.local から VERCEL_TOKEN を読み込む
function loadEnvToken() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const match = line.trim().match(/^VERCEL_TOKEN\s*=\s*(.*)$/);
      if (match) {
        return match[1].replace(/['"]/g, '').trim();
      }
    }
  }
  return process.env.VERCEL_TOKEN;
}

const token = loadEnvToken();

if (!token) {
  console.error('❌ VERCEL_TOKEN が設定されていません。');
  console.error('.env.local に VERCEL_TOKEN=あなたのトークン を設定してください。');
  process.exit(1);
}

const KEEP_LATEST_PER_PROJECT = 5; // 各プロジェクトで保護する最新デプロイ数

async function fetchDeployments() {
  let allDeployments = [];
  let until = undefined;

  console.log('🔍 Vercelからデプロイ一覧を取得中...');

  for (let i = 0; i < 10; i++) {
    const url = new URL('https://api.vercel.com/v6/deployments');
    url.searchParams.set('limit', '100');
    if (until) url.searchParams.set('until', until);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`デプロイ取得失敗 (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const list = data.deployments || [];
    if (list.length === 0) break;

    allDeployments.push(...list);
    if (!data.pagination?.next) break;
    until = data.pagination.next;
  }

  return allDeployments;
}

async function deleteDeployment(id, url) {
  const res = await fetch(`https://api.vercel.com/v13/deployments/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.text();
    console.warn(`  ⚠️ 削除失敗 [${id}] (${url}): ${err}`);
    return false;
  }
  return true;
}

async function main() {
  try {
    const deployments = await fetchDeployments();
    console.log(`📋 合計 ${deployments.length} 件のデプロイ履歴を取得しました。\n`);

    // プロジェクト名ごとにグループ化
    const byProject = new Map();
    for (const d of deployments) {
      const proj = d.name || 'unknown';
      if (!byProject.has(proj)) byProject.set(proj, []);
      byProject.get(proj).push(d);
    }

    let totalDeleted = 0;
    let totalSkipped = 0;

    for (const [project, list] of byProject.entries()) {
      console.log(`📁 プロジェクト: [${project}] (全 ${list.length} 件)`);

      // 作成日時の新しい順（降順）にソート
      list.sort((a, b) => b.created - a.created);

      // 最新の N 件は保護
      const toKeep = list.slice(0, KEEP_LATEST_PER_PROJECT);
      const toDelete = list.slice(KEEP_LATEST_PER_PROJECT);

      console.log(`  🛡️ 最新 ${toKeep.length} 件を保護（削除しません）`);
      console.log(`  🗑️ 削除対象: ${toDelete.length} 件`);

      for (const d of toDelete) {
        const dateStr = new Date(d.created).toLocaleDateString('ja-JP');
        process.stdout.write(`  削除中: ${dateStr} (${d.uid}) ... `);
        const ok = await deleteDeployment(d.uid, d.url);
        if (ok) {
          console.log('✅ 完了');
          totalDeleted++;
        } else {
          totalSkipped++;
        }
        // レートリミット回避のため少しウェイト
        await new Promise((r) => setTimeout(r, 150));
      }
      console.log('');
    }

    console.log('==============================================');
    console.log(`🎉 お掃除完了！`);
    console.log(`  削除成功: ${totalDeleted} 件`);
    console.log(`  推定削減容量: 約 ${(totalDeleted * 0.12).toFixed(1)} GB`);
    console.log('==============================================');
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

main();
