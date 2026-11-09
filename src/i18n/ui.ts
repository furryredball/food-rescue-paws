import raw from '../content/ui.json'
import type { AnswerValue } from '../types/food'
import { fill } from './fill'
import type { LocaleCopy } from './types'

type UiJson = typeof raw

const data = raw as UiJson & { _comment?: string }

function line(key: keyof UiJson): LocaleCopy {
  const value = data[key]
  if (
    typeof value === 'object' &&
    value !== null &&
    'zhHant' in value &&
    'en' in value
  ) {
    return value as LocaleCopy
  }
  throw new Error(`Missing UI copy for "${String(key)}" in src/content/ui.json`)
}

/**
 * UI strings loaded from `src/content/ui.json`.
 * Edit that JSON file to change Traditional Chinese / English text.
 */
export const ui = {
  brandName: line('brandName'),
  welcomeLede: line('welcomeLede'),
  stickerAskGrownUp: line('stickerAskGrownUp'),
  stickerSixFoods: line('stickerSixFoods'),
  stickerSessionTime: line('stickerSessionTime'),
  startInspecting: line('startInspecting'),
  pipDog: line('pipDog'),
  misoCat: line('misoCat'),
  howToPlay: line('howToPlay'),
  instructionsTitle: line('instructionsTitle'),
  instruction1: line('instruction1'),
  instruction2: line('instruction2'),
  instruction3: line('instruction3'),
  instruction4: (count: number) => fill(line('instruction4'), { count }),
  reminderAskGrownUp: line('reminderAskGrownUp'),
  reminderCompact: line('reminderCompact'),
  back: line('back'),
  letsGo: line('letsGo'),
  foodProgress: (n: number, total: number) =>
    fill(line('foodProgress'), { n, total }),
  draft: line('draft'),
  preparation: line('preparation'),
  attemptNote: line('attemptNote'),
  needClue: line('needClue'),
  clueN: (n: number) => fill(line('clueN'), { n }),
  paws: line('paws'),
  pawsAria: (earned: number, total: number) =>
    fill(line('pawsAria'), { earned, total }),
  answerGroupAria: line('answerGroupAria'),
  dogSnackLegend: line('dogSnackLegend'),
  cluesGroupAria: line('cluesGroupAria'),
  feedbackCorrect: line('feedbackCorrect'),
  feedbackShown: line('feedbackShown'),
  feedbackRetry: line('feedbackRetry'),
  feedbackNice: line('feedbackNice'),
  feedbackAlmost: line('feedbackAlmost'),
  feedbackLearn: line('feedbackLearn'),
  feedbackRetryBody: line('feedbackRetryBody'),
  helpfulAnswerIs: (answer: LocaleCopy) =>
    fill(line('helpfulAnswerIs'), {
      answerZh: answer.zhHant,
      answerEn: answer.en,
    }),
  youChose: (answer: LocaleCopy) =>
    fill(line('youChose'), {
      answerZh: answer.zhHant,
      answerEn: answer.en,
    }),
  next: line('next'),
  tryAgain: line('tryAgain'),
  youDidIt: line('youDidIt'),
  badgeEarned: line('badgeEarned'),
  badgeLabel: line('badgeLabel'),
  completionLede: (total: number, paws: number) =>
    fill(line('completionLede'), { total, paws }),
  playAgain: line('playAgain'),
  stillPlaying: line('stillPlaying'),
  inactivityDesc: (seconds: number) => fill(line('inactivityDesc'), { seconds }),
  continue: line('continue'),
  adultToggle: line('adultToggle'),
  safetyNotes: line('safetyNotes'),
  safety1: line('safety1'),
  safety2: line('safety2'),
  safety3: line('safety3'),
  safety4: line('safety4'),
  safety5: line('safety5'),
  sourcesHeading: line('sourcesHeading'),
  sourcesHint: line('sourcesHint'),
  openAssetPreview: line('openAssetPreview'),
  assetPreviewTitle: line('assetPreviewTitle'),
  backToWelcome: line('backToWelcome'),
  assetPreviewLede: line('assetPreviewLede'),
  branding: line('branding'),
  petGuides: line('petGuides'),
  foodCards: line('foodCards'),
  audioPaths: line('audioPaths'),
  logo: line('logo'),
  completionBadge: line('completionBadge'),
  validationFailed: line('validationFailed'),
}

export const ANSWER_LABELS: Record<AnswerValue, LocaleCopy> = {
  dog: data.answers.dog,
  cat: data.answers.cat,
  both: data.answers.both,
  neither: data.answers.neither,
  'ask-grown-up': data.answers['ask-grown-up'],
}
