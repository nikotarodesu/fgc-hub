import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/秀喜/.gemini/antigravity/brain/7f0e3ace-0a67-404b-9c4a-a7befbe2944a';
const prefix = process.argv[2] || 'before';

async function main() {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  // 1. Hero 390
  {
    console.log(`Capturing ${prefix}_hero_390...`);
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    await page.goto('http://localhost:3000/articles/ryu-complete-guide', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, `${prefix}_hero_390.png`) });
    await page.close();
  }

  // 2. Combo closed 390
  {
    console.log(`Capturing ${prefix}_combo_closed_390...`);
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    await page.goto('http://localhost:3000/articles/ryu-complete-guide', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const combo = page.locator('[data-combo-card]').first();
    await combo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, `${prefix}_combo_closed_390.png`) });
    await page.close();
  }

  // 3. Combo open 390
  {
    console.log(`Capturing ${prefix}_combo_open_390...`);
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    await page.goto('http://localhost:3000/articles/ryu-complete-guide', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const combo = page.locator('[data-combo-card]').first();
    await combo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const toggle = combo.locator('[data-combo-toggle]').first();
    if (await toggle.count() > 0) {
      await toggle.click();
    } else {
      await combo.click();
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, `${prefix}_combo_open_390.png`) });
    await page.close();
  }

  // 4. TOC modal 390
  {
    console.log(`Capturing ${prefix}_toc_390...`);
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    await page.goto('http://localhost:3000/articles/ryu-complete-guide', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    const tocBtn = page.locator('button:has-text("目次")').first();
    await tocBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, `${prefix}_toc_390.png`) });
    await page.close();
  }

  // 5. Combo 320 large font
  {
    console.log(`Capturing ${prefix}_combo_320_large...`);
    const page = await browser.newPage({
      viewport: { width: 320, height: 700 },
    });
    await page.goto('http://localhost:3000/articles/ryu-complete-guide', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-font-size', 'large');
    });
    const combo320 = page.locator('[data-combo-card]').first();
    await combo320.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, `${prefix}_combo_320_large.png`) });
    await page.close();
  }

  // 6. PC 1280
  {
    console.log(`Capturing ${prefix}_pc_1280...`);
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
    });
    await page.goto('http://localhost:3000/articles/ryu-complete-guide', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const comboPC = page.locator('[data-combo-card]').first();
    await comboPC.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, `${prefix}_pc_1280.png`) });
    await page.close();
  }

  await browser.close();
  console.log('Finished capturing all scenarios!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
