import { DeviceProduct } from './types';

export const DEVICE_PRODUCTS: Record<string, DeviceProduct> = {
  // ==========================================
  // キーボード
  // ==========================================
  'razer-huntsman-v3-pro-mini': {
    id: 'razer-huntsman-v3-pro-mini',
    name: 'Razer Huntsman V3 Pro Mini (日本語配列)',
    category: 'keyboard',
    categoryLabel: 'キーボード',
    compatibility: ['PC (Windows 10/11)'],
    targetUser: '最速の歩きガード・反応速度とコンパクトさを最優先したいプレイヤー',
    badge: '筆者愛用・メイン機材',
    summary:
      '第2世代アナログオプティカルスイッチとラピッドトリガーを搭載した60%小型ゲーミングキーボード。アクチュエーションポイントを0.1mm〜4.0mmの範囲で0.1mm単位で調整可能。',
    pros: [
      'ラピッドトリガー搭載でキーを戻した瞬間に即ニュートラル復帰（歩きガードの精度が格段に向上）',
      'アクチュエーションポイント0.1mm設定で最速のボタン反応を実現',
      'デスクを広く使え、斜め置きや膝置きプレイにも適した60%コンパクトサイズ',
      '高耐久テクスチャードPBTキーキャップで激しい打鍵でも摩耗しにくい',
    ],
    cons: [
      '矢印キーやファンクションキーがFnキー併用となるため、普段の文書作成・仕事用途には慣れが必要',
      '家庭用ゲーム機（PS5/PS4）単体での直接キーボード操作には非対応（PC版スト6専用）',
    ],
    specHighlights: [
      { label: 'スイッチ', value: '第2世代アナログオプティカル' },
      { label: 'ラピッドトリガー', value: '対応（最小0.1mm）' },
      { label: 'AP調整範囲', value: '0.1mm 〜 4.0mm（0.1mm刻み）' },
      { label: '配列・サイズ', value: '日本語配列 / 60%コンパクト' },
      { label: '接続方式', value: '有線USB Type-C（着脱式）' },
    ],
    officialUrl: 'https://www.razer.com/jp-jp/gaming-keyboards/razer-huntsman-v3-pro-mini',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://m.media-amazon.com/images/I/712r-1xpO9L._AC_SL1500_.jpg',
    authorVerified: true,
    authorComment:
      'レバーレスを長年使い込んできましたが、現在は本機をメインコントローラーとして使用しています。特に歩きガードの「前入れからガードへの戻り」がラピッドトリガーにより指のわずかな戻りで成立するため、被弾率が目に見えて減りました。',
    noteReviewUrl: 'https://note.com/nikotarosun/n/n587884db1c36',
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=Razer+Huntsman+V3+Pro+Mini+JP&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'Razer公式サイト',
        url: 'https://www.razer.com/jp-jp/gaming-keyboards/razer-huntsman-v3-pro-mini',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },

  'steelseries-apex-pro-tkl': {
    id: 'steelseries-apex-pro-tkl',
    name: 'SteelSeries Apex Pro TKL (日本語配列)',
    category: 'keyboard',
    categoryLabel: 'キーボード',
    compatibility: ['PC (Windows / Mac)'],
    targetUser: 'スト6の超高速入力と、仕事・日常PC作業の快適性を両立したいプレイヤー',
    badge: '作業兼用・万能ハイエンド',
    summary:
      'OmniPoint 2.0 / 3.0磁気スイッチを搭載し、ラピッドトリガーと0.1mm単位の入力調整に対応したテンキーレスキーボード。独立した矢印キーとファンクションキーを備えます。',
    pros: [
      '高速ラピッドトリガーによる素早いコマンド戻りとニュートラル制御',
      'テンキーレス（TKL）サイズで、矢印キーやDelキーが独立しており日常のPC作業も極めて快適',
      'OLEDスマートディスプレイ搭載でプロファイルや設定変更が手元で直感的に確認可能',
      'アルミニウム合金フレームによる高剛性ボディで強い打鍵でもブレない',
    ],
    cons: [
      '60%サイズに比べると横幅があるため、机上のスペース確保が必要',
      'ハイエンドモデルのため価格帯が高め（予算約3万円前後〜）',
    ],
    specHighlights: [
      { label: 'スイッチ', value: 'OmniPoint 磁気ホール効果スイッチ' },
      { label: 'ラピッドトリガー', value: '対応（最小0.1mm）' },
      { label: 'AP調整範囲', value: '0.1mm 〜 4.0mm' },
      { label: '配列・サイズ', value: '日本語配列 / テンキーレス（TKL）' },
      { label: '接続方式', value: '有線USB Type-C（着脱式）' },
    ],
    officialUrl: 'https://jp.steelseries.com/gaming-keyboards/apex-pro-tkl-gen-3',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://images.ctfassets.net/hmm5mo4qf4mf/2qRjmq8sglugWCZZQVCgPx/48adf4a522bdee3cd98c3e3ba4784c8c/apex_pro_tkl_black_img_buy_01.png__1920x1080_crop-fit_optimize_subsampling-2-3764.png',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=SteelSeries+Apex+Pro+TKL&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'SteelSeries公式サイト',
        url: 'https://jp.steelseries.com/gaming-keyboards/apex-pro-tkl-gen-3',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },

  'logicool-g-pro-x-tkl': {
    id: 'logicool-g-pro-x-tkl',
    name: 'Logicool G PRO X TKL LIGHTSPEED (日本語配列)',
    category: 'keyboard',
    categoryLabel: 'キーボード',
    compatibility: ['PC (Windows 10/11)'],
    targetUser: '信頼性の高い定番ブランドで、配線をすっきりさせたい・有線接続も選びたいプレイヤー',
    badge: 'プロ定番メカニカル',
    summary:
      'Logicool GのフラッグシップTKLゲーミングキーボード。独自のLIGHTSPEEDワイヤレスと有線接続に対応し、競技グレードの低遅延通信と高耐久PBTキャップを採用。',
    pros: [
      'LIGHTSPEEDワイヤレス（1msレポートレート）による有線同等の低遅延通信',
      '付属の有線USB-Cケーブルで有線専用としても安定運用可能',
      'デュアルショットPBTキーキャップで印字消えやテカリに強い',
      'ゲームモードキーでWindowsキー等の誤爆をワンタッチで完全防止',
    ],
    cons: [
      'メカニカルスイッチ構造のため、磁気スイッチのようなラピッドトリガーやAP変更には非対応',
      'スト6専用としてミリ秒単位の物理リセットを追求するならラピッドトリガー搭載機の方が優位',
    ],
    specHighlights: [
      { label: 'スイッチ', value: 'GXメカニカル（リニア / タクタイル）' },
      { label: 'ラピッドトリガー', value: '非対応（固定ストローク）' },
      { label: 'キーロールオーバー', value: '全キー対応（Nキー）' },
      { label: '配列・サイズ', value: '日本語配列 / テンキーレス' },
      { label: '接続方式', value: 'LIGHTSPEEDワイヤレス / Bluetooth / 有線Type-C' },
    ],
    officialUrl: 'https://gaming.logicool.co.jp/ja-jp/products/gaming-keyboards/pro-x-tkl-wireless-keyboard.html',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://resource.logitechg.com/content/dam/gaming/en/products/pro-x-tkl-rapid/gallery/pro-x-tkl-rapid-black-gallery-1-us.png',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=Logicool+G+PRO+X+TKL&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'Logicool G公式サイト',
        url: 'https://gaming.logicool.co.jp/ja-jp/products/gaming-keyboards/pro-x-tkl-wireless-keyboard.html',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },

  // ==========================================
  // ゲーミングPC
  // ==========================================
  'pc-standard-rtx4060': {
    id: 'pc-standard-rtx4060',
    name: 'フルHD標準推奨モデル（Core i5 / Ryzen 5 + RTX 4060構成）',
    category: 'gaming-pc',
    categoryLabel: 'ゲーミングPC',
    compatibility: ['PC (Windows 11)'],
    targetUser: 'フルHD解像度でスト6を最高設定・常時60fps固定で快適に対戦したい標準ユーザー',
    badge: 'スト6快適・一番人気構成',
    summary:
      'スト6公式推奨スペックを余裕をもってクリアし、フルHD（1920×1080）解像度で最高画質設定でもバトル中60fps張り付き動作を実現するコストパフォーマンス最強構成。',
    pros: [
      'CAPCOM公式の推奨スペック（RTX 2070相当以上）を大幅に上回る描画性能',
      'バトル中の処理落ち（フレームドロップ）リスクを完全に排除',
      '消費電力と発熱が控えめで、静音性と電気代のバランスが優秀',
      'BTO各社で15〜18万円前後の最も競争が激しい価格帯で入手可能',
    ],
    cons: [
      '4K解像度でのプレイや、最高画質での4K録画・重いVRゲームには力不足',
      'OBSでのCPU負荷の高い高ビットレート配信を同時に行う場合はメモリ32GBへの増設推奨',
    ],
    specHighlights: [
      { label: 'CPU', value: 'Intel Core i5-14400F / AMD Ryzen 5 7500F 相当' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 4060 (8GB)' },
      { label: 'メモリ', value: '16GB (DDR4 / DDR5) ※32GB推奨' },
      { label: 'ストレージ', value: '1TB M.2 NVMe SSD' },
      { label: '想定解像度', value: 'フルHD (1080p) 最高画質 60fps固定' },
    ],
    officialUrl: 'https://www.streetfighter.com/6/ja-jp',
    officialVerifiedDate: '2026-09-25',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'ドスパラ（GALLERIA）',
        url: 'https://www.dospara.co.jp/TC30',
        isSponsored: false,
        label: 'ドスパラ公式サイトで構成を見る',
        isActive: true,
      },
      {
        merchantName: 'マウスコンピューター（G-Tune）',
        url: 'https://www.mouse-jp.co.jp/store/c/cg-tune/',
        isSponsored: false,
        label: 'マウスコンピューターで構成を見る',
        isActive: true,
      },
    ],
  },

  'pc-high-rtx4070-super': {
    id: 'pc-high-rtx4070-super',
    name: '配信・高解像度兼用モデル（Core i7 / Ryzen 7 + RTX 4070 SUPER構成）',
    category: 'gaming-pc',
    categoryLabel: 'ゲーミングPC',
    compatibility: ['PC (Windows 11)'],
    targetUser: 'スト6の高画質配信・動画編集を日常的に行いたい方、WQHDモニターで遊びたい方',
    badge: '配信・クリエイター推奨',
    summary:
      '第14世代Core i7またはRyzen 7にGeForce RTX 4070 SUPERを組み合わせた上位構成。スト6を起動しながらOBS配信やDiscord通話を行ってもフレームレートの揺らぎが一切ありません。',
    pros: [
      'OBS Studioによるハードウェアエンコード（NVENC）配信を同時に回しても常時60fps維持',
      'WQHD（2560×1440）解像度でも最高設定で余裕の動作性能',
      '動画編集ソフト（Premiere Pro / DaVinci Resolve）でのリプレイ編集や書き出しが極めて高速',
      '今後登場する重量級新作タイトルも数年間快適に遊べる将来性',
    ],
    cons: [
      'スト6単体をフルHDで遊ぶだけならオーバースペック（予算23〜28万円前後）',
      '電源容量が750W以上推奨となり筐体サイズもやや大型化する',
    ],
    specHighlights: [
      { label: 'CPU', value: 'Intel Core i7-14700F / AMD Ryzen 7 7800X3D 相当' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 4070 SUPER (12GB)' },
      { label: 'メモリ', value: '32GB (DDR5)' },
      { label: 'ストレージ', value: '1TB〜2TB M.2 NVMe SSD' },
      { label: '想定用途', value: 'WQHDプレイ / OBS同時配信・録画 / 動画編集' },
    ],
    officialUrl: 'https://www.streetfighter.com/6/ja-jp',
    officialVerifiedDate: '2026-09-25',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'ドスパラ（GALLERIA）',
        url: 'https://www.dospara.co.jp/TC30',
        isSponsored: false,
        label: 'ドスパラ公式サイトで構成を見る',
        isActive: true,
      },
      {
        merchantName: 'マウスコンピューター（G-Tune）',
        url: 'https://www.mouse-jp.co.jp/store/c/cg-tune/',
        isSponsored: false,
        label: 'マウスコンピューターで構成を見る',
        isActive: true,
      },
    ],
  },

  'pc-entry-budget': {
    id: 'pc-entry-budget',
    name: 'エントリー導入モデル（Core i5 + GTX 1660S / RTX 3050構成）',
    category: 'gaming-pc',
    categoryLabel: 'ゲーミングPC',
    compatibility: ['PC (Windows 10/11)'],
    targetUser: '初期費用を最小限に抑えて、家庭用機からSteam版スト6へ移行したいプレイヤー',
    badge: '予算重視エントリー',
    summary:
      '予算10万〜12万円前後でPC版スト6を始めるための入門構成。グラフィック設定を適切に最適化（中〜標準設定）することで、対戦に必要な60fpsを安定確保できます。',
    pros: [
      '10万円前後の低予算でPCゲーム環境を導入可能',
      '設定を調整すれば対戦中の60fps固定を維持でき、PC版特有の低遅延メリットを享受可能',
      '省電力で小型ケースモデルが多く置き場所に困らない',
    ],
    cons: [
      '画質設定を「最高」にするとワールドツアーモード等でフレーム低下が起こる場合がある',
      '数年後の最新AAAゲームを遊ぶにはGPUのアップグレードが必要になる',
    ],
    specHighlights: [
      { label: 'CPU', value: 'Intel Core i5-12400 / AMD Ryzen 5 5600 相当' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 3050 (6GB/8GB)' },
      { label: 'メモリ', value: '16GB (DDR4)' },
      { label: 'ストレージ', value: '500GB〜1TB M.2 NVMe SSD' },
      { label: '想定画質', value: 'フルHD (1080p) 標準設定 60fps' },
    ],
    officialUrl: 'https://www.streetfighter.com/6/ja-jp',
    officialVerifiedDate: '2026-09-25',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'ドスパラ（中古・整備品含む）',
        url: 'https://www.dospara.co.jp/TC30',
        isSponsored: false,
        label: 'ドスパラでラインナップを見る',
        isActive: true,
      },
    ],
  },

  // ==========================================
  // ゲーミングモニター
  // ==========================================
  'benq-zowie-xl2546k': {
    id: 'benq-zowie-xl2546k',
    name: 'BenQ ZOWIE XL2546K (24.5インチ / 240Hz)',
    category: 'monitor',
    categoryLabel: 'ゲーミングモニター',
    compatibility: ['PC (DisplayPort/HDMI)', 'PS5 (120Hz出力対応)'],
    targetUser: 'ミリ秒単位の確認・対空反応・視認性を極限まで高めたい競技志向プレイヤー',
    badge: '競技シーン最高峰・240Hz',
    summary:
      'eスポーツトーナメントで圧倒的な採用実績を誇る240Hzゲーミングモニター。BenQ独自の残像低減技術「DyAc+」を搭載し、激しい画面の揺れやラッシュの初動をくっきり視認可能。',
    pros: [
      '240Hz駆動による極小の表示遅延（内部バッファの待ち時間を最小化）',
      'DyAc+技術による圧倒的なモーションブラー（残像）低減で、ヒット確認や対空判断がクリアに',
      'スタンドの高さ・チルト調整範囲が広く、プレイヤーごとの最適な視線位置にミリ単位で固定可能',
      '両サイドに集中シールド（遮光フード）を標準装備し、視界の余計な光や雑音を遮断',
    ],
    cons: [
      'TNパネル特有の視野角の狭さがあり、正面以外から見ると色味が変化する（対戦特化設計）',
      'スピーカー非搭載のため、ヘッドホンまたは外部スピーカーが必須',
      '価格帯が約7万〜8万円前後とモニターとしては高価格',
    ],
    specHighlights: [
      { label: '画面サイズ', value: '24.5インチ（対戦に最適な視界幅）' },
      { label: 'リフレッシュレート', value: '240Hz（PC）/ 120Hz（PS5）' },
      { label: 'パネル方式', value: 'TNパネル（応答速度最優先）' },
      { label: '応答速度', value: '0.5ms (GtG)' },
      { label: '端子構成', value: 'HDMI 2.0 ×3, DisplayPort 1.2 ×1' },
    ],
    officialUrl: 'https://zowie.benq.com/ja-jp/monitor/xl2546k.html',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://image.benq.com/is/image/benqco/01-xl2546k-xl-black-front-6?$ResponsivePreset$',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=BenQ+ZOWIE+XL2546K&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'BenQ ZOWIE公式サイト',
        url: 'https://zowie.benq.com/ja-jp/monitor/xl2546k.html',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },

  'benq-mobiuz-ex2510s': {
    id: 'benq-mobiuz-ex2510s',
    name: 'BenQ MOBIUZ EX2510S (24.5インチ / 165Hz IPS)',
    category: 'monitor',
    categoryLabel: 'ゲーミングモニター',
    compatibility: ['PC', 'PS5 (120Hz対応)', 'Nintendo Switch', 'Xbox'],
    targetUser: '色鮮やかな画質でスト6を楽しみつつ、165Hz・低遅延の対戦性能も妥協したくないプレイヤー',
    badge: '画質＆性能バランスNo.1',
    summary:
      '高画質なIPSパネルを採用しながら、165Hz高速リフレッシュレートと応答速度1ms MPRTを実現した万能ゲーミングモニター。高音質なtreVolo内蔵スピーカーも備えます。',
    pros: [
      'IPSパネルによる広視野角と美麗な発色（スト6のエフェクトやステージの迫力を堪能）',
      '165Hz駆動による滑らかな描画と低入力遅延で実戦パフォーマンス十分',
      'treVoloスピーカー（2.5W×2）内蔵で、ヘッドセットなしでも迫力ある効果音を楽しめる',
      'PCだけでなくPS5の120Hz出力やHDMI 2.0にフル対応し複数ハードの切り替えも容易',
    ],
    cons: [
      '240Hz超競技用TNモニター（XL2546K等）と比較すると残像感・絶対的な遅延短縮幅では一歩譲る',
      '本体背面のデザインにやや奥行きがあり、デスクの奥行きが浅い場合はモニターアーム推奨',
    ],
    specHighlights: [
      { label: '画面サイズ', value: '24.5インチ' },
      { label: 'リフレッシュレート', value: '165Hz（PS5 120Hz対応）' },
      { label: 'パネル方式', value: 'IPSパネル（色鮮やか・広視野角）' },
      { label: '応答速度', value: '1ms MPRT / 2ms GtG' },
      { label: '端子構成', value: 'HDMI 2.0 ×2, DisplayPort 1.2 ×1, ヘッドホン端子' },
    ],
    officialUrl: 'https://www.benq.com/ja-jp/monitor/gaming/ex2510s.html',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://image.benq.com/is/image/benqco/ex2510s-right45-2?$ResponsivePreset$',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=BenQ+MOBIUZ+EX2510S&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'BenQ公式サイト',
        url: 'https://www.benq.com/ja-jp/monitor/gaming/ex2510s.html',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },

  'asus-tuf-vg259qr': {
    id: 'asus-tuf-vg259qr',
    name: 'ASUS TUF Gaming VG259QR (24.5インチ / 165Hz IPS)',
    category: 'monitor',
    categoryLabel: 'ゲーミングモニター',
    compatibility: ['PC', 'PS5 (120Hz対応)', 'Xbox', 'Switch'],
    targetUser: '予算2万円台で、高さ調整もできる確かな165Hzゲーミング環境を整えたいプレイヤー',
    badge: '高コスパ・入門定番',
    summary:
      '手頃な価格帯ながら165Hz駆動・応答速度1ms（GtG）・Fast IPSパネルを兼ね備えた高コスパモデル。ピボット・チルト・スイベル・高さ調整に対応した高機能スタンドが標準付属。',
    pros: [
      '2万円台前半〜半ばで購入できる抜群のコストパフォーマンス',
      'Fast IPSパネル採用により、IPSの美しさと1ms GtGの高速応答を両立',
      'ピボット（縦回転）や高さ調整が可能なエルゴノミックスタンド付属で追加アーム不要',
      'Shadow Boost機能により暗いステージでもキャラクターの輪郭が判別しやすい',
    ],
    cons: [
      '内蔵スピーカーの音質は簡易的なため、対戦時はヘッドホンやイヤホン推奨',
      'HDR機能は非対応（対戦格闘ゲームのプレイには全く支障なし）',
    ],
    specHighlights: [
      { label: '画面サイズ', value: '24.5インチ' },
      { label: 'リフレッシュレート', value: '165Hz（PS5 120Hz対応）' },
      { label: 'パネル方式', value: 'Fast IPSパネル' },
      { label: '応答速度', value: '1ms (GtG)' },
      { label: '端子構成', value: 'HDMI 1.4 ×2, DisplayPort 1.2 ×1' },
    ],
    officialUrl: 'https://www.asus.com/jp/displays-desktops/monitors/tuf-gaming/tuf-gaming-vg259qr/',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://dlcdnwebimgs.asus.com/gain/ad0edd0b-2554-4cd5-89ef-0a285f93ff66/',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=ASUS+VG259QR&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'ASUS公式サイト',
        url: 'https://www.asus.com/jp/displays-desktops/monitors/tuf-gaming/tuf-gaming-vg259qr/',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },

  // ==========================================
  // レバーレスコントローラー
  // ==========================================
  'punk-workshop-mini-hitbox': {
    id: 'punk-workshop-mini-hitbox',
    name: 'PUNK WORKSHOP Mini HitBox (薄型レバーレス)',
    category: 'leverless',
    categoryLabel: 'レバーレス',
    compatibility: ['PC (Windows)', 'PS5 (要対応基板またはコンバーター)'],
    targetUser: 'プロ大会や競技シーンで支持される超高速反応・薄型軽量モデルを求める方',
    badge: '競技シーン定番・超低遅延',
    summary:
      '世界中のトッププロが愛用する超薄型レバーレスコントローラー。独自開発の超低ストロークキースイッチとRaspberry Pi Pico（GP2040-CE）またはBrook基板による極小の入力遅延を実現。',
    pros: [
      '押し込みストロークが極めて浅く、最速のダッシュ・対空・コマンド入力が可能',
      '膝置き・机置きのどちらでも安定するマグネット開閉式の軽量スリムボディ',
      '天板が簡単に開閉でき、キースイッチの交換やメンテナンスが非常に容易',
      'スト6の追加ボタン需要（パリィやインパクト専用ボタン）に応える拡張ボタン配置',
    ],
    cons: [
      '人気のため公式ショップや国内代理店での入荷待ち・予約販売になることが多い',
      'PS5で直接プレイする場合はPS5対応基板モデルの選択またはBrook Wingman等のコンバーターが必要',
    ],
    specHighlights: [
      { label: 'タイプ', value: '超薄型レバーレスコントローラー' },
      { label: 'スイッチ', value: 'PUNK WORKSHOP独自メカニカルスイッチ' },
      { label: '基板', value: 'Raspberry Pi Pico (GP2040-CE) / Brook' },
      { label: '接続方式', value: '有線USB Type-C' },
      { label: 'SOCD', value: '上優先 / ニュートラル切替対応（CPT準拠）' },
    ],
    officialUrl: 'https://punkworkshop.top/',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://punkworkshop.jp/cdn/shop/files/m0.jpg',
    authorVerified: true,
    authorComment:
      'レバーレスを何台も乗り換えてきましたが、PUNK WORKSHOPのボタンストロークの短さと入力の軽さは群を抜いています。指先を滑らせるような入力でも正確に技が出ます。',
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=PUNK+WORKSHOP+%E3%83%AC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%B9&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'PUNK WORKSHOP公式サイト',
        url: 'https://punkworkshop.top/',
        isSponsored: false,
        label: '公式サイトでラインナップを見る',
        isActive: true,
      },
    ],
  },

  'haute42-t16': {
    id: 'haute42-t16',
    name: 'Haute42 T16 / G16 シリーズ (高コスパレバーレス)',
    category: 'leverless',
    categoryLabel: 'レバーレス',
    compatibility: ['PC (Windows)', 'Switch', 'PS4', 'PS5 (要パススルー対応ドングル)'],
    targetUser: '1万円台前半で始められる高性能・多ボタンなレバーレスを探している方',
    badge: 'コスパ最強・入門おすすめ',
    summary:
      '1万円前後という驚異の価格でオープンソース基板「GP2040-CE」と1ms未満の極小遅延を実現した大人気レバーレス。16ボタン構成でインパクトやパリィの押し分けが抜群にやりやすい。',
    pros: [
      '1万円台前半で購入できる圧倒的なコストパフォーマンス',
      'ボタン数が16個あり、親指や小指周辺にパリィ・インパクトを自由にアサイン可能',
      '小型OLEDディスプレイを搭載し、入力キーや現在のSOCDモードが一目で確認可能',
      'Kailhロープロファイルスイッチ採用でキータッチが軽快かつ静音性も良好',
    ],
    cons: [
      'PS5単体での直接認識はできず、パススルー用のUSBドングル（Booter 5等）が別途必要',
      'アクリル積層ボディのため、高価格帯の金属製モデルに比べるとやや軽め（膝置きは滑り止め推奨）',
    ],
    specHighlights: [
      { label: 'タイプ', value: '16ボタン薄型アクリルレバーレス' },
      { label: 'スイッチ', value: 'Kailh Low Profile スイッチ' },
      { label: '基板', value: 'GP2040-CE（オープンソース超低遅延）' },
      { label: '接続方式', value: '有線USB Type-C' },
      { label: 'ディスプレイ', value: '小型OLEDスクリーン搭載' },
    ],
    officialUrl: 'https://haute42.com/',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://haute42.com/wp-content/uploads/2024/03/T16.png',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=Haute42+%E3%83%AC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%B9&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'Haute42公式サイト',
        url: 'https://haute42.com/',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },

  'hitbox-original': {
    id: 'hitbox-original',
    name: 'Hit Box（ヒットボックス）公式オリジナルモデル',
    category: 'leverless',
    categoryLabel: 'レバーレス',
    compatibility: ['PC (Windows)', 'PS4', 'PS5 (公式コンバーターまたはPS4版動作)'],
    targetUser: '頑丈な金属筐体と三和電子製ボタンで、膝置きでどっしり安定してプレイしたい方',
    badge: 'レバーレスの元祖・高剛性',
    summary:
      'レバーレスコントローラーのパイオニア「Hit Box Arcade」のオリジナル機。堅牢なスチール製筐体にアーケード純正の三和電子製24mm/30mmボタンを搭載した元祖・王道モデル。',
    pros: [
      '金属製筐体による適度な重量（約2kg）で、激しい対戦でも膝の上やデスクで一切ブレない',
      'ゲームセンターと同じ三和電子製ボタンを採用しており、打鍵感と耐久性が抜群',
      'CPT（CAPCOM Pro Tour）公認の歴史があり、大会利用の安心感が最も高い',
      '底面全体に滑り止めフォームパッドが貼られており膝置きの快適性が最高クラス',
    ],
    cons: [
      '薄型レバーレスに比べると厚み・重量があり、持ち運びには専用バッグ等が必要',
      '価格帯が約4万円前後と高価格帯',
    ],
    specHighlights: [
      { label: 'タイプ', value: 'フルサイズ金属筐体レバーレス' },
      { label: 'ボタン', value: '三和電子製 24mm×11 / 30mm×1' },
      { label: '重量', value: '約2.1kg（抜群の安定感）' },
      { label: '接続方式', value: '着脱式航空コネクタUSBケーブル' },
      { label: '底面', value: '全面ラバー滑り止め加工' },
    ],
    officialUrl: 'https://www.hitboxarcade.com/',
    officialVerifiedDate: '2026-09-25',
    imageUrl: 'https://www.hitboxarcade.com/cdn/shop/files/Hit_Box_-_HB_Logo_-_black-red_91ff14a8-3044-49fa-8fa6-47d717f17da2_1200x1200.png',
    authorVerified: false,
    merchantLinks: [
      {
        merchantName: 'Amazon',
        url: 'https://www.amazon.co.jp/s?k=Hit+Box+%E3%83%AC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%B9&tag=nikotarosf6-22',
        isSponsored: true,
        label: 'Amazonで詳細を見る',
        isActive: true,
      },
      {
        merchantName: 'Hit Box公式サイト',
        url: 'https://www.hitboxarcade.com/',
        isSponsored: false,
        label: '公式サイトで仕様を見る',
        isActive: true,
      },
    ],
  },
};

export function getDeviceProductsByCategory(category: string): DeviceProduct[] {
  return Object.values(DEVICE_PRODUCTS).filter((p) => p.category === category);
}

export function getDeviceProductById(id: string): DeviceProduct | undefined {
  return DEVICE_PRODUCTS[id];
}
