import { BiText } from '../components/BiText'
import { Speech } from '../components/Speech'
import { copy, type LocaleCopy } from '../i18n/types'
import { ANSWER_LABELS, ui } from '../i18n/ui'
import type { AnswerValue, FoodCard } from '../types/food'

interface FeedbackScreenProps {
  card: FoodCard
  correct: boolean
  revealed: boolean
  selectedAnswer: AnswerValue
  onContinue: () => void
}

export function FeedbackScreen({
  card,
  correct,
  revealed,
  selectedAnswer,
  onContinue,
}: FeedbackScreenProps) {
  let title = ui.feedbackNice
  let body: LocaleCopy = card.explanation
  let result = ui.feedbackCorrect
  let beat: 'pip' | 'miso' = 'pip'
  let beatLine = ui.pipCorrect

  if (!correct && !revealed) {
    beatLine = ui.pipRetry
    title = ui.feedbackAlmost
    body = ui.feedbackRetryBody
    result = ui.feedbackRetry
  } else if (!correct && revealed) {
    beat = 'miso'
    beatLine = ui.misoHandoff
    title = ui.feedbackLearn
    const helpful = ui.helpfulAnswerIs(ANSWER_LABELS[card.correctAnswer])
    body = copy(
      `${card.explanation.zhHant} ${helpful.zhHant}`,
      `${card.explanation.en} ${helpful.en}`,
    )
    result = ui.feedbackShown
  }

  return (
    <section className="screen screen--feedback" aria-labelledby="feedback-title">
      <div
        className={
          correct
            ? 'feedback-banner is-correct'
            : revealed
              ? 'feedback-banner is-revealed'
              : 'feedback-banner is-retry'
        }
        role="status"
      >
        <BiText
          copy={result}
          as="p"
          className="feedback-banner__result"
          mode="inline"
        />
        <BiText copy={title} as="h1" id="feedback-title" />
        <BiText copy={body} as="p" />
        <BiText
          copy={ui.youChose(ANSWER_LABELS[selectedAnswer])}
          as="p"
          className="feedback-banner__choice"
        />
      </div>

      <Speech who={beat} line={beatLine} />

      <button type="button" className="btn btn--primary" onClick={onContinue}>
        <BiText
          copy={correct || revealed ? ui.next : ui.tryAgain}
          mode="inline"
        />
      </button>
    </section>
  )
}
