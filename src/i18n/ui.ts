import { copy, type LocaleCopy } from './types'
import type { AnswerValue } from '../types/food'

export const ui = {
  brandName: copy('食物救援爪爪', 'Food Rescue Paws'),
  welcomeLede: copy(
    '和狗狗 Pip、貓咪 Miso 一起檢查回收食物——真正餵寵物前，一定要先問大人。',
    'Help Pip the dog and Miso the cat inspect rescued food — then always ask a grown-up before feeding a real pet.',
  ),
  stickerAskGrownUp: copy('先問大人', 'Ask a grown-up'),
  stickerSixFoods: copy('6 種食物', '6 foods'),
  stickerSessionTime: copy('約 2–3 分鐘', '2–3 min'),
  startInspecting: copy('開始檢查 →', 'Start inspecting →'),
  pipDog: copy('狗狗 Pip', 'Pip the dog'),
  misoCat: copy('貓咪 Miso', 'Miso the cat'),

  howToPlay: copy('怎麼玩', 'How to play'),
  instructionsTitle: copy('仔細看，再小心選。', 'Look closely. Choose carefully.'),
  instruction1: copy(
    '看看食物照片、名稱和製作說明。',
    'Look at the food photo, name and preparation details.',
  ),
  instruction2: copy('需要時可以點提示。', 'Tap optional clues if you want a hint.'),
  instruction3: copy(
    '選擇可能適合誰：狗、貓、兩者都可以、兩者都不行，或先問大人。',
    'Choose who it might be for: Dog, Cat, Both, Neither, or Ask a grown-up.',
  ),
  instruction4: (count: number): LocaleCopy =>
    copy(
      `完成 ${count} 種食物各得一隻爪印。第一次答錯還可以再試一次。`,
      `Earn one paw for each of ${count} foods you finish. You can try again if your first guess needs another look.`,
    ),
  reminderAskGrownUp: copy(
    '提醒：真正餵寵物前，一定要先問大人。',
    'Reminder: always ask a grown-up before offering food to a real pet.',
  ),
  reminderCompact: copy(
    '真正餵寵物前，一定要先問大人。',
    'Always ask a grown-up before feeding a real pet.',
  ),
  back: copy('返回', 'Back'),
  letsGo: copy('開始吧 →', 'Let’s go →'),

  foodProgress: (n: number, total: number): LocaleCopy =>
    copy(`食物 ${n}/${total}`, `Food ${n}/${total}`),
  draft: copy('草稿', 'Draft'),
  preparation: copy('製作方式', 'Preparation'),
  attemptNote: copy(
    '再仔細看看——你還有一次機會。',
    'Take another careful look — you have one more try.',
  ),
  needClue: copy('需要提示嗎？', 'Need a clue?'),
  clueN: (n: number): LocaleCopy => copy(`提示 ${n}`, `Clue ${n}`),
  paws: copy('爪印', 'Paws'),
  pawsAria: (earned: number, total: number): LocaleCopy =>
    copy(`已獲得 ${earned} / ${total} 隻爪印`, `${earned} of ${total} paws earned`),
  answerGroupAria: copy('這食物可能適合誰？', 'Who could this food be for?'),
  cluesGroupAria: copy('可選提示', 'Optional clues'),

  feedbackCorrect: copy('答對了', 'Correct'),
  feedbackShown: copy('揭曉答案', 'Answer shown'),
  feedbackRetry: copy('再試一次', 'Try again'),
  feedbackNice: copy('檢查得很棒！', 'Nice inspecting!'),
  feedbackAlmost: copy('差一點——再看看', 'Almost — look again'),
  feedbackLearn: copy('一起來學', 'Let’s learn together'),
  feedbackRetryBody: copy(
    '這個選擇和食物細節不太吻合。再看看製作方式和提示，然後再試一次。',
    'That choice does not match this food’s details. Check the preparation and clues, then try once more.',
  ),
  helpfulAnswerIs: (answer: LocaleCopy): LocaleCopy =>
    copy(`有幫助的答案是：${answer.zhHant}。`, `The helpful answer is ${answer.en}.`),
  youChose: (answer: LocaleCopy): LocaleCopy =>
    copy(`你選了：${answer.zhHant}`, `You chose: ${answer.en}`),
  next: copy('下一個', 'Next'),
  tryAgain: copy('再試一次', 'Try again'),

  youDidIt: copy('完成了', 'You did it'),
  badgeEarned: copy('獲得食物救援徽章！', 'Food Rescue badge earned!'),
  badgeLabel: copy('食物救援徽章', 'Food Rescue badge'),
  completionLede: (total: number, paws: number): LocaleCopy =>
    copy(
      `你檢查了 ${total} 種食物，收集了 ${paws} 隻爪印。記住：真正餵寵物前要先問大人。`,
      `You inspected ${total} foods and collected ${paws} progress paws. Remember: ask a grown-up before feeding a real pet.`,
    ),
  playAgain: copy('再玩一次 →', 'Play again →'),

  stillPlaying: copy('還在玩嗎？', 'Still playing?'),
  inactivityDesc: (seconds: number): LocaleCopy =>
    copy(
      `遊戲將在 ${seconds} 秒後重新開始，方便下一位訪客遊玩。`,
      `This game will restart in ${seconds} second${seconds === 1 ? '' : 's'} so the next visitor can play.`,
    ),
  continue: copy('繼續', 'Continue'),

  adultToggle: copy('給大人：安全與資料來源', 'Grown-ups: safety & sources'),
  safetyNotes: copy('安全說明', 'Safety notes'),
  safety1: copy(
    '這是給 6–9 歲的教育檢查遊戲，不是獸醫建議。',
    'This is an educational inspection game for ages 6–9, not veterinary advice.',
  ),
  safety2: copy(
    '真正把食物給寵物前，一定要先問大人。',
    'Always ask a grown-up before offering any food to a real pet.',
  ),
  safety3: copy(
    '精選的消費前剩餘食物（尚未使用、仍安全的食物）和盤中剩菜或腐壞食物不同。',
    'Selected pre-consumer surplus (unused, still-safe food) is different from plate scraps or spoiled food.',
  ),
  safety4: copy(
    '初期卡片標示為草稿，有待合格審核。請勿從本遊戲推導餵食份量或均衡餐食食譜。',
    'Initial cards are marked draft pending qualified review. Do not invent feeding quantities or balanced-meal recipes from this game.',
  ),
  sourcesHeading: copy('資料來源', 'Sources'),
  sourcesHint: copy(
    '遊戲中只以文字顯示網址。請在遊戲結束後用其他裝置開啟。',
    'URLs are listed as text only during play. Open them on a separate device after the session.',
  ),
  openAssetPreview: copy('開啟素材預覽', 'Open asset preview'),
  assetPreviewTitle: copy('素材預覽', 'Asset preview'),
  backToWelcome: copy('返回歡迎頁', 'Back to welcome'),
  assetPreviewLede: copy(
    '缺少的檔案會顯示標籤佔位圖，不會出現破圖圖示。請把檔案放到 public/assets/ 並使用相同路徑。',
    'Missing files show labelled placeholders instead of broken-image icons. Replace files under public/assets/ using the same paths.',
  ),
  branding: copy('品牌', 'Branding'),
  petGuides: copy('寵物嚮導', 'Pet guides'),
  foodCards: copy('食物卡片', 'Food cards'),
  audioPaths: copy('音效路徑', 'Audio paths'),
  logo: copy('標誌', 'Logo'),
  completionBadge: copy('完成徽章', 'Completion badge'),
  validationFailed: copy('資料驗證失敗', 'Data validation failed'),
} as const

export const ANSWER_LABELS: Record<AnswerValue, LocaleCopy> = {
  dog: copy('狗', 'Dog'),
  cat: copy('貓', 'Cat'),
  both: copy('兩者都可以', 'Both'),
  neither: copy('兩者都不行', 'Neither'),
  'ask-grown-up': copy('先問大人', 'Ask a grown-up'),
}
