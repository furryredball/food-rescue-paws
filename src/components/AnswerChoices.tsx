import { ANSWER_LABELS, ANSWER_VALUES, type AnswerValue } from '../types/food'

interface AnswerChoicesProps {
  disabled?: boolean
  onSelect: (answer: AnswerValue) => void
}

export function AnswerChoices({ disabled = false, onSelect }: AnswerChoicesProps) {
  return (
    <div className="answer-choices" role="group" aria-label="Who could this food be for?">
      {ANSWER_VALUES.map((value) => (
        <button
          key={value}
          type="button"
          className={`answer-choices__btn answer-choices__btn--${value}`}
          disabled={disabled}
          onClick={() => onSelect(value)}
        >
          <span className="answer-choices__symbol" aria-hidden="true">
            {symbolFor(value)}
          </span>
          <span className="answer-choices__text">{ANSWER_LABELS[value]}</span>
        </button>
      ))}
    </div>
  )
}

function symbolFor(value: AnswerValue): string {
  switch (value) {
    case 'dog':
      return 'D'
    case 'cat':
      return 'C'
    case 'both':
      return 'B'
    case 'neither':
      return 'N'
    case 'ask-grown-up':
      return '?'
  }
}
