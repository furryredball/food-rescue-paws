import { ANSWER_LABELS, type AnswerValue, type FoodCard } from '../types/food'

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
  let title = 'Nice inspecting!'
  let body = card.explanation

  if (!correct && !revealed) {
    title = 'Almost — look again'
    body =
      'That choice does not match this food’s details. Check the preparation and clues, then try once more.'
  } else if (!correct && revealed) {
    title = 'Let’s learn together'
    body = `${card.explanation} The helpful answer is ${ANSWER_LABELS[card.correctAnswer]}.`
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
        <p className="feedback-banner__result">
          {correct ? 'Correct' : revealed ? 'Answer shown' : 'Try again'}
        </p>
        <h1 id="feedback-title">{title}</h1>
        <p>{body}</p>
        <p className="feedback-banner__choice">
          You chose: {ANSWER_LABELS[selectedAnswer]}
        </p>
      </div>

      <p className="reminder">
        Always ask a grown-up before offering food to a real pet.
      </p>

      <button type="button" className="btn btn--primary" onClick={onContinue}>
        {correct || revealed ? 'Next' : 'Try again'}
      </button>
    </section>
  )
}
