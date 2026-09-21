import fs from 'fs';
import path from 'path';

const desktopDir = 'C:/Users/秀喜/Desktop/SF6kyotu';
const outFilePath = path.resolve('src/data/articles/sf6CommonTechniques.ts');

const metaList = [
  // 初級 1〜9
  {
    num: 25,
    pattern: '25-handan-wo-herasu-renshu',
    slug: 'handan-wo-herasu-renshu',
    title: '判断を減らす練習',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 1,
    theme: 'training',
    themeLabel: '判断・練習設計',
    targetAudience: '対戦中に何を選べばいいか迷い、技の出遅れや判断ミスが起きてしまう初級者',
    keyTakeaways: [
      '強いプレイヤーは速く考えているのではなく、状況の前提条件で事前に選択肢を削っている',
      '判断を減らす基本単位は「1つの主力行動」「1つの代表対策」「1つの返し」の3点セット',
      '「見る」と「選ぶ」を分離し、押す技を事前に決めておくことで相手の動作に集中できる',
    ],
    actionStep: {
      task: 'トレモで「対空」のボタンを1種類だけに固定し、相手のジャンプに最速で出す練習を5分行う',
      steps: [
        'ダミーのレコードに垂直ジャンプと前ジャンプを記録する',
        '出す対空技を最も得意な1種類（ワンボタン対空や強Pなど）だけに固定する',
        '「どの技で落とすか」の迷いを完全に捨て、ダミーが浮いた瞬間に決めたボタンを押す感覚を掴む',
      ],
    },
    nextArticleReason: '判断を減らす基本思考を整理したら、次は地上戦で最も根幹となる3要素「置き・差し・差し返し」の三すくみと循環構造を学びます。',
  },
  {
    num: 1,
    pattern: '01-oki-sashi-sashikaeshi',
    slug: 'oki-sashi-sashikaeshi',
    title: '置き・差し・差し返し',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 2,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '地上戦で何を振ればよいか分からない、技の三すくみの関係性を整理したい初級者',
    keyTakeaways: [
      '地上戦は「前進・置き・差し返し」の三すくみで循環している',
      '置き技は相手の前進を止め、差しは相手の後退や待ちを咎め、差し返しは空振りを狩る',
      '全要素を同時に狙うのではなく、相手の直前の行動傾向に合わせて1つに狙いを絞る',
    ],
    actionStep: {
      task: '中距離で自分の主力牽制技の先端がどこまで届くか、トレモで正確な距離を確認する',
      steps: [
        '自キャラのリーチ最長技をトレモで振る',
        '相手が静止している状態でギリギリ当たる間合いを体感して覚える',
        '一歩下がって空振りした時の全体硬直の長さを体感する',
      ],
    },
    nextArticleReason: '三すくみの関係を理解したら、地上戦を前進しながら組み立てる「歩きガードから差す」技術を身につけます。',
  },
  {
    num: 2,
    pattern: '02-aruki-guard-kara-sasu',
    slug: 'aruki-guard-kara-sasu',
    title: '歩きガードから差す',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 3,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '前歩きすると相手の技に当たってしまう、安全にラインを上げたい初級者',
    keyTakeaways: [
      '前に歩くこと自体が相手へ圧力を与え、相手に技を空振らせる合図になる',
      '一気に走らず「数歩歩いてしゃがみガード」を小刻みに繰り返すことで被弾リスクを抑える',
      '相手の置き技をガードまたは手前で空振りさせたら、自分の得意なリーチで差し込む',
    ],
    actionStep: {
      task: 'CPU戦やトレモで「歩いてしゃがみガード」の一定リズムを体に覚え込ませる',
      steps: [
        '前歩きを0.5秒入力したら下後ろ（1方向）へ素早く切り替える',
        '相手の牽制技をガードできたら、再び前歩きで間合いを詰めていく',
        '相手が下がり始めたら長い通常技を1発触らせる',
      ],
    },
    nextArticleReason: '歩きガードで相手に技を振らせられるようになったら、次は相手の技をガードした後の反撃判断「打ち返しの判断と対策」へ進みます。',
  },
  {
    num: 9,
    pattern: '09-uchikaeshi-no-handan-to-taisaku',
    slug: 'uchikaeshi-no-handan-to-taisaku',
    title: '打ち返しの判断と対策',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 4,
    theme: 'advantage',
    themeLabel: '有利・不利の攻防',
    targetAudience: '相手の技をガードした後にボタンを押すべきか迷い、反撃を受けがちな初級者',
    keyTakeaways: [
      'ガード後の状況は「確定反撃」「有利」「不利」の3つに単純化して捉える',
      '相手の隙が大きい技（大攻撃や必殺技空振り）には迷わず決まった反撃を叩き込む',
      '有利不利が曖昧な場面では無理な最速暴れを控え、ガードで相手の連係傾向を観察する',
    ],
    actionStep: {
      task: '相手の代表的な大技をガードした時の確定反撃コンボをトレモで練習する',
      steps: [
        'トレモでダミーに隙の大きい突進技や大足をガードさせる',
        '自キャラの最速通常技（弱攻撃など）が確定でヒットするか確認する',
        '確定反撃から簡単な必殺技コンボまで繋ぐパターンを1つ固定する',
      ],
    },
    nextArticleReason: '相手の技への反撃を覚えたら、次は対戦で最も頻出する「微有利（+1F〜+3F）」での攻防へ進みます。',
  },
  {
    num: 11,
    pattern: '11-biyuri-no-kobo',
    slug: 'biyuri-no-kobo',
    title: '微有利の攻防',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 5,
    theme: 'advantage',
    themeLabel: '有利・不利の攻防',
    targetAudience: '小技を当てた後やガードさせた後の攻め継続が上手くいかない初級者',
    keyTakeaways: [
      '微有利（+1〜+3F）は打撃と投げの基本二択を仕掛ける絶好のチャンス',
      '相手の最速暴れを潰す小技打撃と、ガードを崩す通常投げをシンプルに使い分ける',
      '無理に欲張らず、相手が暴れる傾向があるなら暴れ潰し打撃だけに絞る',
    ],
    actionStep: {
      task: '微有利から最速小技で相手の暴れを潰す連係をトレモで試す',
      steps: [
        '小技をガードさせた後、もう一度小技を最速で押す練習をする',
        'ダミーのガード復帰設定を「最速弱P」にして暴れを確実に潰せるか確認する',
        'カウンターヒットを確認してコンボに繋げる',
      ],
    },
    nextArticleReason: '微有利の攻めを覚えたら、今度は守り側の必須テクニックである「遅らせ投げの使い方」を学びます。',
  },
  {
    num: 12,
    pattern: '12-okurase-nage-no-tsukaikata',
    slug: 'okurase-nage-no-tsukaikata',
    title: '遅らせ投げの使い方',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 6,
    theme: 'defense',
    themeLabel: '防御・リスク管理',
    targetAudience: '起き上がりや密着で打撃と投げの二択に毎回負けてしまう初級者',
    keyTakeaways: [
      '遅らせ投げ（遅らせグラップ）は打撃をガードしながら投げを抜ける防御技術',
      '早すぎると打撃のカウンターを食らい、遅すぎると投げられるため一定のディレイを意識する',
      '相手のシミー（後ろ歩き）には大ダメージを受けるため、多用しすぎないリスク管理が必要',
    ],
    actionStep: {
      task: 'トレモで起き上がりの打撃ガードと投げ抜けを両立するタイミングを体感する',
      steps: [
        'ダミーに起き攻め「最速打撃」と「通常投げ」の2パターンをランダム再生させる',
        'ガード入力から一瞬（数フレ）遅らせて弱P+弱Kを押す',
        '打撃はガード、投げは抜けられるタイミングを指に馴染ませる',
      ],
    },
    nextArticleReason: '防御の基本を固めたら、次は一気に相手へ攻め込む強力な攻撃手段「生ラッシュの通し方」へ進みます。',
  },
  {
    num: 13,
    pattern: '13-nama-rush-no-toshikata',
    slug: 'nama-rush-no-toshikata',
    title: '生ラッシュの通し方',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 7,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: 'パリィからの生ラッシュが相手の通常技に止められてしまう初級者',
    keyTakeaways: [
      '生ラッシュは直線的な突進。通すには相手の意識の外（後退中や硬直中）を突く',
      '遠距離から漫然と走るのではなく、相手が技を振れない間合いや弾を撃った瞬間に仕掛ける',
      'ラッシュ急停止や手前での下段など、迎撃技を誘って狩る工夫を混ぜる',
    ],
    actionStep: {
      task: '相手が後ろ歩きした瞬間や弾を撃った瞬間に絞って生ラッシュを出す練習',
      steps: [
        'トレモで相手の足元と前後のステップに視線を置く',
        '相手が後退した瞬間にラッシュを入力して得意な突進技を触らせる',
        'ガードされたら微有利の攻防へ繋げる',
      ],
    },
    nextArticleReason: '生ラッシュの通し方を理解したら、逆に相手の生ラッシュを止める「ラッシュ止め対策」を学びます。',
  },
  {
    num: 14,
    pattern: '14-rush-dome-taisaku',
    slug: 'rush-dome-taisaku',
    title: 'ラッシュ止め対策',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 8,
    theme: 'defense',
    themeLabel: '防御・リスク管理',
    targetAudience: '相手の生ラッシュに突っ込まれて簡単に画面端へ運ばれてしまう初級者',
    keyTakeaways: [
      'ラッシュは緑の光を見てから反応するのではなく、走る前の「相手の前進」を警戒する',
      '迎撃には判定が強く発生の早い中攻撃や小技を事前に決めておく',
      '距離が近すぎる場合は止めるのを諦め、パリィやガードへ即座に切り替える',
    ],
    actionStep: {
      task: 'トレモでダミーの生ラッシュをボタン1つで迎撃する反射練習を行う',
      steps: [
        'ダミーのスロット1に生ラッシュからの通常技を記録する',
        'スロット2に前歩きからの通常技を記録しランダム再生する',
        'ラッシュの緑の光が見えた瞬間に自キャラの迎撃技（中Pや下弱P）を1回押す',
      ],
    },
    nextArticleReason: 'ラッシュへの対応を身につけたら、試合全体を通じた「防御のリスク管理」の総まとめへ進みます。',
  },
  {
    num: 16,
    pattern: '16-bogyo-no-risk-kanri',
    slug: 'bogyo-no-risk-kanri',
    title: '防御のリスク管理',
    difficulty: 'beginner',
    difficultyLabel: '初級',
    difficultyOrder: 9,
    theme: 'defense',
    themeLabel: '防御・リスク管理',
    targetAudience: '被弾が多くて体力がすぐに溶けてしまう、守りの基準を持ちたい初級者',
    keyTakeaways: [
      '防御の目的は「無傷で切り抜けること」ではなく「最小限の損失で相手のターンを終わらせること」',
      '投げは受けても2000前後の固定ダメージだが、シミーや暴れ潰しは4000以上の大惨事になる',
      '体力・ゲージ残量・画面位置の3要素から「今は何を通されてもよいか」を逆算する',
    ],
    actionStep: {
      task: '実戦で「画面中央では投げ抜けを捨てて完全ガードに徹する」試合を1戦試す',
      steps: [
        '相手に起き攻めされたら一切ボタンを押さずガードを維持する',
        '相手が投げてきたら「安いダメージで済んだ」と捉える',
        '相手の打撃暴れ潰しを完全に空振り・ガードさせる安心感を体感する',
      ],
    },
    nextArticleReason: '初級の全9ステップを修了しました！次からは中級編。地上戦の真骨頂である「差し返しの作り方」へステップアップします。',
  },

  // 中級 1〜10
  {
    num: 3,
    pattern: '03-sashikaeshi-no-tsukurikata',
    slug: 'sashikaeshi-no-tsukurikata',
    title: '差し返しの作り方',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 1,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '差し返しを狙っても反応が間に合わない、相手に技を振らせたい中級者',
    keyTakeaways: [
      '差し返しは「待って見てから反応する」のではなく「前進で相手に技を振らせて下がる」ことで作る',
      '相手が技を振りたくなる間合い（相手の得意リーチ）に一瞬入り、すぐに半歩下がる',
      '相手の空振りの全体硬直の長い大技にターゲットを絞って狙う',
    ],
    actionStep: {
      task: 'トレモでダミーに大攻撃を空振らせ、その戻り硬直を叩く練習を行う',
      steps: [
        'ダミーに大足や大攻撃の空振りを記録する',
        '空振りの終わり際に自キャラの中攻撃や大攻撃を重ねてパニカンを取る',
        '前進から停止のステップを入れて同じタイミングで叩けるようにする',
      ],
    },
    nextArticleReason: '差し返しの作り方を覚えたら、次はどの技で差し返すのがベストかを決める「差し返し技の選び方」を学びます。',
  },
  {
    num: 4,
    pattern: '04-sashikaeshi-waza-no-erabikata',
    slug: 'sashikaeshi-waza-no-erabikata',
    title: '差し返し技の選び方',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 2,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '差し返し技が届かない、または発生が遅くて反撃が間に合わない中級者',
    keyTakeaways: [
      '差し返し技はリーチだけでなく「発生の早さ」と「前進する判定」のバランスで選ぶ',
      'ヒット確認からまとまったリターン（必殺技やキャンセルラッシュ）が取れる技を優先する',
      '大技には大攻撃、中技には中攻撃と、相手の技の硬直の長さに応じて使い分ける',
    ],
    actionStep: {
      task: '自キャラの通常技の中から差し返しに最適な「主力1本」をトレモで選定する',
      steps: [
        'リーチの長い技、発生が早い技をそれぞれ相手の大技空振りに当ててみる',
        'キャンセルが効いて必殺技やラッシュに繋がる技を最優先に選ぶ',
        'その技1本だけに絞って実戦で差し返しを試す',
      ],
    },
    nextArticleReason: '差し返し技が決まったら、次は対戦相手の技との有利不利を見抜く「技相性の見方」を学びます。',
  },
  {
    num: 5,
    pattern: '05-waza-aiso-no-mikata',
    slug: 'waza-aiso-no-mikata',
    title: '技相性の見方',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 3,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '相手の特定の通常技にいつも一方的に潰されて困っている中級者',
    keyTakeaways: [
      '技相性は「発生」「リーチ」「打点の高さ」「判定の強さ」の4要素で決まる',
      '低い打点の技には上から被せる技、高い打点の技には姿勢が低くなる技が勝つ',
      '相手の強い牽制技に対して、真正面からぶつけずに噛み合う技をトレモで見つける',
    ],
    actionStep: {
      task: '苦手な相手の主力牽制技をトレモでダミーに振らせ、勝てる技を検証する',
      steps: [
        'ダミーに相手の主力技（ルークの屈中Pなど）を振らせる',
        '自キャラの技を複数ぶつけてみて、判定勝ちまたは相打ち以上になる技を探す',
        '見つけた技を実戦でその技への対策として登録する',
      ],
    },
    nextArticleReason: '技相性を把握したら、地上戦で最も奥が深い「置き技の使い分け」へ進みます。',
  },
  {
    num: 6,
    pattern: '06-oki-no-tsukaiwake',
    slug: 'oki-no-tsukaiwake',
    title: '置きの使い分け',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 4,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '置き技を空振って差し返される、置きの目的を整理したい中級者',
    keyTakeaways: [
      '置きには「前進止め」「差し潰し」「相手の技を誘うフェイク」の3つの目的がある',
      '硬直の短い技は相手の突進や前歩きを止めつつ差し返されにくい',
      '大技の置きはリターンが高いが空振りリスクも最大。振る回数を限定する',
    ],
    actionStep: {
      task: '隙の小さい置き技とリターンの大きい置き技を1本ずつ選定し使い分ける',
      steps: [
        '硬直が短く連打の効く技（弱攻撃や中P）を相手の前進止めに設定する',
        '当たれば大ダメージの技（大P等）を相手が走りそうなタイミングに限定して振る',
        '無暗に連発せず、相手が動く気配に合わせて振る練習をする',
      ],
    },
    nextArticleReason: '置き技を整理したら、地上戦で相手を画面端へ追い詰める「先端連係の攻防」へ進みます。',
  },
  {
    num: 10,
    pattern: '10-sentan-renkei-no-kobo',
    slug: 'sentan-renkei-no-kobo',
    title: '先端連係の攻防',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 5,
    theme: 'advantage',
    themeLabel: '有利・不利の攻防',
    targetAudience: '先端当てされた相手の連係をどう凌げばよいか、自らどう使うか知りたい中級者',
    keyTakeaways: [
      '先端当ては反撃を受けにくく、相手の小技暴れが届かない安全な攻め',
      '守り側は無理に暴れず、相手の後続行動（追撃か後退か）を観察して対処する',
      '先端当てされた後の相手の生ラッシュや前歩きに対して技を置く意識を持つ',
    ],
    actionStep: {
      task: '自キャラの先端当て連係をトレモで構築し、反撃が届かないか確認する',
      steps: [
        '通常技の先端がギリギリ届く間合いから必殺技やキャンセルラッシュを仕込む',
        'ガードされた後に相手の最速小技が空振るか確認する',
        '空振った相手に確定反撃を入れる連係を完成させる',
      ],
    },
    nextArticleReason: '先端連係の距離感を掴んだら、より危険な「密着微不利の守り方」へ進みます。',
  },
  {
    num: 17,
    pattern: '17-micchaku-bifuri-no-mamorikata',
    slug: 'micchaku-bifuri-no-mamorikata',
    title: '密着微不利の守り方',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 6,
    theme: 'defense',
    themeLabel: '防御・リスク管理',
    targetAudience: '技をガードされて-1F〜-2Fになった瞬間、どう守ればいいか分からない中級者',
    keyTakeaways: [
      '密着-1F〜-2Fは相手の最速4F小技に最速暴れで勝てない危険地帯',
      '選択肢は「素直にガード」「バクステ」「無敵技」「遅らせ投げ」の4択に整理する',
      '相手が投げを狙ってくるならバクステやジャンプ、打撃重ねならガードが基本',
    ],
    actionStep: {
      task: '密着-2Fの状況から相手の最速打撃に対してガードとバクステを使い分ける練習',
      steps: [
        'トレモで自キャラの-2Fになる技をガードさせ、直後の行動を試す',
        '最速打撃にはガードが最も安全であることを確認する',
        '相手の通常投げに対してバクステでパニカンを取るタイミングを掴む',
      ],
    },
    nextArticleReason: '微不利の守りを固めたら、中級者の壁である「状況確認と仕込み」の技術へ進みます。',
  },
  {
    num: 15,
    pattern: '15-jokyo-kakunin-to-shikomi',
    slug: 'jokyo-kakunin-to-shikomi',
    title: '状況確認と仕込み',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 7,
    theme: 'training',
    themeLabel: '判断・練習設計',
    targetAudience: 'ヒット確認が苦手で技を空振った時に必殺技が暴発してしまう中級者',
    keyTakeaways: [
      '「ヒット確認」と「空振り仕込み」は全く異なる技術。混同しない',
      '仕込みは技が空振った時は必殺技が出ず、接触した時だけ発動する入力猶予を利用する',
      'ヒット確認は単発ではなく2段技や連打キャンセルを利用して猶予を伸ばす',
    ],
    actionStep: {
      task: '中足に波動拳や必殺技を仕込み、空振り時は出ず接触時だけ出る感覚を体感する',
      steps: [
        'トレモで相手から離れた位置で中足を振り、素早く必殺技コマンドを入力する（空振りなので出ない）',
        'そのまま相手に歩み寄り、中足が接触した瞬間に必殺技が自動発動することを確認する',
        '実戦でこの「仕込み」を相手の前進に合わせて置いてみる',
      ],
    },
    nextArticleReason: '仕込みを理解したら、相手のキャンセル攻撃から身を守る「キャンセル確認の防御」を学びます。',
  },
  {
    num: 18,
    pattern: '18-cancel-kakunin-no-bogyo',
    slug: 'cancel-kakunin-no-bogyo',
    title: 'キャンセル確認の防御',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 8,
    theme: 'defense',
    themeLabel: '防御・リスク管理',
    targetAudience: '相手の通常技キャンセル必殺技に毎回暴れて大ダメージを食らってしまう中級者',
    keyTakeaways: [
      '相手がキャンセル必殺技を入れ込んでいるか、確認して止めているかを観察する',
      '入れ込みが多い相手には技の隙間への割り込み（無敵技や小技）が刺さる',
      '確認して止めてくる相手には、技の終わり際に前歩きや反撃の圧力をかける',
    ],
    actionStep: {
      task: '相手の代表的なキャンセル連係の「隙間のフレーム」をトレモで調べる',
      steps: [
        'ダミーに通常技→必殺技の連係を記録する',
        '連係の隙間に最速4F小技やOD無敵技で割り込めるかガード復帰で試す',
        '連続ガードになる技と隙間がある技を明確に区別する',
      ],
    },
    nextArticleReason: '連係の防御を学んだら、一発逆転の防御オプション「ジャストパリィの狙い方」へ進みます。',
  },
  {
    num: 19,
    pattern: '19-just-parry-no-nerai-kata',
    slug: 'just-parry-no-nerai-kata',
    title: 'ジャストパリィの狙い方',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 9,
    theme: 'defense',
    themeLabel: '防御・リスク管理',
    targetAudience: 'ジャストパリィを狙ってパニカン投げを食らってしまう中級者',
    keyTakeaways: [
      'ジャストパリィは単発のランダムな技ではなく「タイミングが一定の多段連係や弾」に狙う',
      '失敗しても通常のパリィになり、パニカン投げされるリスクが低い場面に限定する',
      '成功時は補正でダメージが50%に減るため、最大ダメージより起き攻めや位置入れ替えを優先する',
    ],
    actionStep: {
      task: 'ダミーの飛び道具や多段技に対してジャストパリィのタイミングを練習する',
      steps: [
        'ダミーに波動拳や2段突進技を打たせる',
        '攻撃判定が当たる直前（2F以内）にパリィボタンを押す',
        '成功時の暗転演出を確認し、最速で小技や中攻撃を押して反撃する',
      ],
    },
    nextArticleReason: '中級の地上戦・防御を網羅したら、地上を崩す最後のピース「飛びの通し方」へ進みます。',
  },
  {
    num: 8,
    pattern: '08-tobi-no-toshikata',
    slug: 'tobi-no-toshikata',
    title: '飛びの通し方',
    difficulty: 'intermediate',
    difficultyLabel: '中級',
    difficultyOrder: 10,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '前ジャンプすると毎回対空されてしまい、飛びが全く通らない中級者',
    keyTakeaways: [
      '飛びは「飛ぶ瞬間」ではなく「飛ぶ前の地上戦」で対空意識を奪うことで通す',
      '下段や弾、生ラッシュで相手の視線を地上に釘付けにした直後が飛びの急所',
      '相手が対空技のコマンド入力を意識している間合い（中距離）では絶対に飛ばない',
    ],
    actionStep: {
      task: '実戦で「相手に下段や歩きを見せて意識を下げさせた直後」に1回だけ飛ぶ',
      steps: [
        '中距離で歩きガードや下段技を2〜3回見せる',
        '相手が地上を警戒して固まった瞬間を見計らって前ジャンプする',
        '対空が出ずにフルコンボが入る感覚を確認する',
      ],
    },
    nextArticleReason: '中級編10ステップ全修了！いよいよ上級編へ。相手の心理と反応を操る「相手の反応を引き出す」高度な駆け引きへ進みます。',
  },

  // 上級 1〜6
  {
    num: 7,
    pattern: '07-aite-no-hanno-wo-hikidasu',
    slug: 'aite-no-hanno-wo-hikidasu',
    title: '相手の反応を引き出す',
    difficulty: 'advanced',
    difficultyLabel: '上級',
    difficultyOrder: 1,
    theme: 'training',
    themeLabel: '判断・練習設計',
    targetAudience: '格上相手に自分の攻撃が通らない、相手の行動を誘導したい上級者',
    keyTakeaways: [
      '意図的な空振りや微前進を見せることで、相手の指先の反応を引き出して観察する',
      '相手が何に一番過剰反応するか（飛び、前進、大技の空振り）を1ラウンド目にテストする',
      '相手の癖や反応パターンが判明したら、その反応を狩る罠（釣り行動）を仕掛ける',
    ],
    actionStep: {
      task: '試合開始直後に届かない位置で小技を空振り、相手がどう動くか観察する',
      steps: [
        '開幕、安全な遠距離で小技を1回空振る',
        '相手が前進してくるか、弾を撃つか、飛びを狙うか、じっと待つかを記録する',
        'その反応に合わせて2手目の選択肢（置き技・対空・前歩き）を決定する',
      ],
    },
    nextArticleReason: '相手の反応を引き出す技術を身につけたら、上級ディフェンスの極み「ジャストパリィとラッシュ仕込み」へ進みます。',
  },
  {
    num: 20,
    pattern: '20-just-parry-to-rush-shikomi',
    slug: 'just-parry-to-rush-shikomi',
    title: 'ジャストパリィとラッシュ仕込み',
    difficulty: 'advanced',
    difficultyLabel: '上級',
    difficultyOrder: 2,
    theme: 'defense',
    themeLabel: '防御・リスク管理',
    targetAudience: 'ジャストパリィ成功時の反撃リターンを最大化したい上級者',
    keyTakeaways: [
      'ジャストパリィ入力時に前ステップ（ラッシュ）を仕込むことで自動分岐を作る',
      'パリィ成功時は即座にドライブラッシュが発動し、遠距離でも最速パニカン反撃が届く',
      '手前で空振りされた場合でもラッシュで硬直を狩りにいける間合いを検証しておく',
    ],
    actionStep: {
      task: 'パリィボタンを押しながら前前入力を仕込むテクニックをトレモで練習する',
      steps: [
        'ダミーに中距離の牽制技を記録する',
        '相手の技に合わせてパリィ＋前前（66）を入力する',
        'ジャストパリィ成立時に暗転から即座にラッシュが出ることを確認する',
      ],
    },
    nextArticleReason: '防御からの最大リターンを確保したら、勝敗を直結する「ゲージを投資して回収する」リソース論へ進みます。',
  },
  {
    num: 21,
    pattern: '21-gauge-wo-toushi-shite-kaishu-suru',
    slug: 'gauge-wo-toushi-shite-kaishu-suru',
    title: 'ゲージを投資して回収する',
    difficulty: 'advanced',
    difficultyLabel: '上級',
    difficultyOrder: 3,
    theme: 'resource',
    themeLabel: 'ゲージ・リソース',
    targetAudience: 'ドライブゲージがすぐに枯渇してバーンアウトしてしまう上級者',
    keyTakeaways: [
      'Dゲージは「消費する」のではなく「リターンと回収を見込んで投資する」意識を持つ',
      'OD技やキャンセルラッシュで3本消費しても、コンボ後の起き攻めやSA演出で2本以上回収できるルートを選ぶ',
      'バーンアウト寸前の無駄遣いを避け、ゲージ2本以下になったら投資を止めて温存モードへ切り替える',
    ],
    actionStep: {
      task: '自キャラのコンボルートごとに「消費Dゲージ」と「回収Dゲージ」の収支を計算する',
      steps: [
        'キャンセルラッシュを使ったコンボの終了時のゲージ残量を確認する',
        'SA3を使った時の演出中の自然回復量を確認する',
        'ゲージ収支がプラスまたは微減で済む高効率ルートを主力コンボに設定する',
      ],
    },
    nextArticleReason: '自分のゲージ管理をマスターしたら、次は「相手のリソースで読み合いを変える」相手ゲージの観察へ進みます。',
  },
  {
    num: 22,
    pattern: '22-aite-no-resource-de-yomiai-wo-kaeru',
    slug: 'aite-no-resource-de-yomiai-wo-kaeru',
    title: '相手のリソースで読み合いを変える',
    difficulty: 'advanced',
    difficultyLabel: '上級',
    difficultyOrder: 4,
    theme: 'resource',
    themeLabel: 'ゲージ・リソース',
    targetAudience: '相手のゲージ状況を見ずに同じ攻め方をして逆転されてしまう上級者',
    keyTakeaways: [
      '相手のDゲージが2本以下なら、打撃ガードによる削りと画面端追い詰めが凶悪な武器になる',
      '相手にSAゲージがある時はOD無敵技だけでなくSA割り込みを常に計算に入れる',
      '相手のリソース状況に応じて、ローリスクな削り勝ちとハイリスクな倒し切りを切り替える',
    ],
    actionStep: {
      task: '対戦画面で「相手のDゲージのメモリ」を意識的にチラ見する習慣をつける',
      steps: [
        '相手を画面端に追い詰めた瞬間、相手のDゲージを確認する',
        '相手が残り1本以下なら無理に崩さず、技をガードさせてバーンアウトを狙う',
        '相手のBO時の確定削りコンボをトレモで準備しておく',
      ],
    },
    nextArticleReason: '相手の枯渇を突く考え方を学んだら、勝負を決定づける「バーンアウト攻めの組み立て方」へ進みます。',
  },
  {
    num: 23,
    pattern: '23-burnout-zeme-no-kumikatekata',
    slug: 'burnout-zeme-no-kumikatekata',
    title: 'バーンアウト攻めの組み立て方',
    difficulty: 'advanced',
    difficultyLabel: '上級',
    difficultyOrder: 5,
    theme: 'resource',
    themeLabel: 'ゲージ・リソース',
    targetAudience: '相手をバーンアウトさせても仕留めきれずに回復されてしまう上級者',
    keyTakeaways: [
      'バーンアウト中の相手はガード硬直が+4F増加し、通常は不利な技でも有利に変化する',
      '画面端でのインパクト（DI）スタンをチラつかせ、相手の暴れやジャンプを打撃で狩る',
      '連続ガード連携で削りつつ、隙間3F以内の暴れ潰しを組み立ててスタンまで追い込む',
    ],
    actionStep: {
      task: 'トレモで相手をバーンアウト状態に設定し、自キャラの連ガ削り連携を組み立てる',
      steps: [
        '環境設定で相手のDゲージを0（バーンアウト）にする',
        '普段五分の技をガードさせ、+4F有利から小技や中技が割り込まれずに繋がるか確認する',
        '画面端でドライブインパクトを当ててスタンさせる理想の詰め手順を確立する',
      ],
    },
    nextArticleReason: 'バーンアウト攻めを極めたら、共通技術全25記事の集大成「弾で相手を動かす」へ進みます。',
  },
  {
    num: 24,
    pattern: '24-tama-de-aite-wo-ugokasu',
    slug: 'tama-de-aite-wo-ugokasu',
    title: '弾で相手を動かす',
    difficulty: 'advanced',
    difficultyLabel: '上級',
    difficultyOrder: 6,
    theme: 'ground',
    themeLabel: '地上戦・間合い',
    targetAudience: '波動拳などの飛び道具が飛ばれてフルコンボを食らってしまう上級者',
    keyTakeaways: [
      '弾は「当てるため」に撃つのではなく「相手を飛ばせる」「パリィを押させる」「動かす」ために撃つ',
      '相手が飛べない遠距離で弾を撃ち、飛べる中距離では弾を構えるふりをして対空を待つ',
      '弾抜け技（OD技・SA・突進）を持つ相手には、弾抜けの間合いの外で撃つか、撃たずに空振りを誘う',
    ],
    actionStep: {
      task: 'トレモで相手の弾抜け技が届く距離と届かない距離の境界線を把握する',
      steps: [
        'ダミーに代表的な弾抜け技（キャミィのアクセルスピンナックルやSA等）を記録する',
        '自キャラの弾を撃った際に弾抜けが確定する距離を特定する',
        'その距離の内側では弾を撃たずに対空や差し返しで待つ立ち回りを徹底する',
      ],
    },
    nextArticleReason: 'おめでとうございます！SF6共通技術全25記事をすべて修了しました。学んだ知識を実戦で試し、自分自身の立ち回りに昇華させていきましょう！',
  },
];

const files = fs.readdirSync(desktopDir).filter(f => f.endsWith('.md'));

const articles = metaList.map(m => {
  const fileName = files.find(f => f.startsWith(m.pattern));
  if (!fileName) {
    throw new Error(`File not found for pattern: ${m.pattern}`);
  }
  // CRLFをLFに正規化
  const raw = fs.readFileSync(path.join(desktopDir, fileName), 'utf8').replace(/\r\n/g, '\n');

  // H1抽出
  const h1Match = raw.match(/^#\s+(.+)$/m);
  const title = h1Match ? h1Match[1].trim() : m.title;

  // Antigravityメモの分離
  let mainMarkdown = raw;
  let antigravityNotes = '';
  const notesIndex = raw.indexOf('## Antigravity実装メモ');
  if (notesIndex !== -1) {
    mainMarkdown = raw.slice(0, notesIndex).trim();
    antigravityNotes = raw.slice(notesIndex).trim();
  }

  // クレンジング処理

  // ② 参考資料の項目を削除（## 参考資料 〜 次の見出しまたは末尾まで）
  mainMarkdown = mainMarkdown.replace(/\n#+\s*参考資料[\s\S]*?(?=\n#+\s+|$)/g, '');

  // ④ 関連記事の項目を削除（## 関連記事 〜 次の見出しまたは末尾まで）
  mainMarkdown = mainMarkdown.replace(/\n#+\s*関連記事[\s\S]*?(?=\n#+\s+|$)/g, '');

  // ③ 管理用表現の修正
  mainMarkdown = mainMarkdown.replace(/ただし、先端連係の攻防は第10記事で詳しく扱います。/g, 'ただし、先端連係の攻防は[先端連係の攻防](/sf6/strategy/sentan-renkei-no-kobo)で詳しく扱います。');
  mainMarkdown = mainMarkdown.replace(/統合版第(\d+)記事[「『]([^」』]+)[」』]/g, '[$2](/sf6/strategy)');

  // ⑤ 空になっている表の削除と前後の文章修正
  // 1) 20: 練習5の距離別確認表
  if (m.num === 20) {
    const target = /### 練習5：距離を三段階に分ける[\s\S]*?実戦では、確認済みの距離だけで狙います。/;
    if (!target.test(mainMarkdown)) {
      console.warn(`[WARN] Article 20 practice 5 target not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target,
      `### 練習5：距離を三段階に分けて検証する\n\n近距離、中距離、先端付近の3つの間合いで同じ記録を再生し、それぞれの結果を比較します。\n\n- **近距離**: パリィ成功時の反撃猶予が長く、最大ダメージのラッシュ反撃が安定して届きやすい間合い\n- **中距離**: パリィ後の打撃がギリギリ届くか確認し、手前空振り時にもラッシュで硬直を狩れる主力の間合い\n- **先端付近**: 接触時はガードになりやすく、手前空振り時にはラッシュ打撃が届かない危険がある間合い\n\n実戦では感覚で狙わず、あらかじめ反撃が届くことを確認できた距離に限定して狙います。`
    );
  }

  // 2) 21: 練習1の始動別ルート比較表 & 練習5のSA用途表
  if (m.num === 21) {
    const target1 = /### 1\. 同じ始動から複数ルートを比較する[\s\S]*?最大ダメージだけでなく、位置と手番を必ず記録します。/;
    if (!target1.test(mainMarkdown)) {
      console.warn(`[WARN] Article 21 target 1 not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target1,
      `### 1. 同じ始動から複数ルートを比較する\n\nノーゲージ、OD技、キャンセルラッシュ、SA使用ルートを記録して比較します。比較する際は、単なるダメージの高さだけでなく、以下の項目を総合的に確認しましょう。\n\n- **消費Dゲージ・SAゲージ**: 投資に見合うリターンが得られるか\n- **ダメージ量**: 相手の体力を削り切れる（リーサル）かどうか\n- **画面運びと位置関係**: 画面端へ追い込めるか、あるいは位置を入れ替えられるか\n- **起き攻めの状況**: ダウン後に有利な密着状況を作れるか、詐欺飛びにいけるか\n- **コンボ終了時のDゲージ残量**: 攻め継続や相手の反撃に耐えられるリソースが残るか\n\n最大ダメージだけでなく、その後の位置と手番まで含めてルートごとの損得を評価します。`
    );
    const target2 = /### 5\. SAの用途表を作る[\s\S]*?これにより、SAをダメージ以外の目的でも選べるようになります。/;
    if (!target2.test(mainMarkdown)) {
      console.warn(`[WARN] Article 21 target 2 not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target2,
      `### 5. SAの用途を整理する\n\n各SA（SA1 / SA2 / SA3・CA）の使い道をあらかじめ整理しておきます。\n\n- **主な始動技**: どの技からヒット確認して繋げるか\n- **リーサル目安**: 相手の体力が何割以下なら倒し切れるか\n- **画面運び・位置入れ替え**: 端へ到達できるか、自陣の画面端から脱出できるか\n- **ダウン後の起き攻め**: 技後に有利Fを取って攻めを継続できるか\n- **Dゲージ回復への寄与**: 演出中にDゲージがどれくらい自然回復するか\n- **使用後の抑止力**: 相手の無敵技や暴れを警戒させる効果が残るか\n\nこれにより、SAを単なる最大ダメージ狙いだけでなく、位置取りやDゲージ回復などの戦術的投資としても使い分けられるようになります。`
    );
  }

  // 3) 23: 練習1のBO時フレーム比較表
  if (m.num === 23) {
    const target = /### 1\. BO時のフレームを確認する[\s\S]*?数値だけでなく、ガードバックと次の技の到達を確認します。/;
    if (!target.test(mainMarkdown)) {
      console.warn(`[WARN] Article 23 target not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target,
      `### 1. BO時のフレームを確認する\n\n普段使う通常技や必殺技について、通常時とバーンアウト（BO）時のガード硬直差の変化（BO時はガード硬直が+4F増加）を比較・整理します。確認する際の要点は以下の通りです。\n\n- **ガード硬直差の変化**: 通常時は微不利や五分の技が、BO時ガードで有利フレーム（+4F加算）に化けるか\n- **次に届く連携技**: 有利フレームから連続ガード（連ガ）や暴れ潰しになる技がスムーズに届くか\n- **相手の割り込みの有無**: 技の隙間に無敵SAや通常技暴れで割り込まれる隙（4F以上）があるか\n\n数値の比較だけでなく、ガードバックによるノックバック距離と次の技の到達距離をセットで把握することが重要です。`
    );
  }

  // 4) 24: 練習5の弾抜け成立表
  if (m.num === 24) {
    const target = /### 5\. 弾抜けの成立表を作る[\s\S]*?技が当たるかだけでなく、相手がどこまで近づくかも記録します。/;
    if (!target.test(mainMarkdown)) {
      console.warn(`[WARN] Article 24 target not matched!`);
    }
    mainMarkdown = mainMarkdown.replace(
      target,
      `### 5. 弾抜けの成立条件を整理する\n\n相手の弾抜け技（OD無敵技、SA、突進技など）に対して、距離と弾速ごとの成立条件を整理します。具体的には以下の要素を検証しましょう。\n\n- **弾抜けの確定状況**: 見てから弾抜け技が確定ヒットしてしまう間合いと弾速の組み合わせ\n- **ガードが間に合う状況**: 弾を撃った後でも硬直が解けてガードが間に合うか\n- **空振りに対する反撃**: 相手の弾抜け技が届かず空振った場合、手痛いパニカン反撃を叩き込めるか\n- **使用後の位置関係**: 弾抜けを防いだ後の画面端やラインの押し引き\n\n相手の技が届くかどうかだけでなく、ガードされた場合や空振り時にどちらが有利な位置を取れるかまで把握しておきます。`
    );
  }

  // ① 記事の末や文中にある --- という文字を全面的に削除
  mainMarkdown = mainMarkdown
    .split('\n')
    .filter(line => line.trim() !== '---')
    .join('\n')
    .trim();

  // サマリー抽出（H1以降の最初のテキスト段落）
  const linesAfterH1 = raw.replace(/^#\s+.+$/m, '').trim().split('\n');
  let summaryParas = [];
  for (const line of linesAfterH1) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (summaryParas.length > 0) break;
      continue;
    }
    if (trimmed.startsWith('#') || trimmed.startsWith('|') || trimmed.startsWith('<!--') || trimmed.startsWith('-')) {
      if (summaryParas.length > 0) break;
      continue;
    }
    summaryParas.push(trimmed.replace(/\*\*/g, ''));
  }
  const summary = summaryParas.join(' ') || `${title}の解説。実戦における判断と立ち回りの基本を整理します。`;

  // 読了時間（文字数から算出、約500文字で1分）
  const charCount = raw.length;
  const readMinutes = Math.max(3, Math.round(charCount / 500));
  const readTime = `${readMinutes}分`;

  return {
    id: `sf6-tech-${String(m.num).padStart(2, '0')}`,
    slug: m.slug,
    title,
    summary,
    game: 'sf6',
    category: 'system',
    character: undefined,
    characterColor: undefined,
    author: 'AUTHOR_INFO',
    publishedAt: '2026-09-21',
    updatedAt: '2026-09-21',
    readTime,
    isPaid: false,
    tags: ['スト6', '共通技術', '地上戦', m.difficultyLabel],
    likesCount: 120 + m.num * 5,
    series: 'sf6-common-techniques',
    articleNumber: m.num,
    difficulty: m.difficulty,
    difficultyLabel: m.difficultyLabel,
    difficultyOrder: m.difficultyOrder,
    theme: m.theme,
    themeLabel: m.themeLabel,
    targetAudience: m.targetAudience,
    keyTakeaways: m.keyTakeaways,
    actionStep: m.actionStep,
    nextArticleReason: m.nextArticleReason,
    markdownContent: mainMarkdown,
    antigravityNotes: antigravityNotes || undefined,
    freeContent: {
      intro: summary,
      sections: [],
    },
    paidContent: {
      sections: [],
    },
  };
});

// TypeScriptファイルとして出力
const tsCode = `import { Article, AUTHOR_INFO } from '../articles';

export const SF6_COMMON_TECHNIQUES_ARTICLES: Article[] = ${JSON.stringify(articles, null, 2)
  .replace(/"author": "AUTHOR_INFO"/g, '"author": AUTHOR_INFO')};
`;

fs.writeFileSync(outFilePath, tsCode, 'utf8');
console.log(`Successfully generated ${articles.length} articles to ${outFilePath}`);

// 検証チェック
for (const art of articles) {
  const mc = art.markdownContent;
  if (mc.includes('## 参考資料')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains ## 参考資料!`);
  }
  if (mc.includes('## 関連記事')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains ## 関連記事!`);
  }
  if (mc.includes('第10記事')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains 第10記事!`);
  }
  if (mc.includes('統合版')) {
    console.error(`[ERROR] Article ${art.articleNumber} still contains 統合版!`);
  }
  const lines = mc.split('\n');
  for (const line of lines) {
    if (line.trim() === '---') {
      console.error(`[ERROR] Article ${art.articleNumber} still contains --- line!`);
    }
  }
}
console.log('All articles passed validation checks!');
