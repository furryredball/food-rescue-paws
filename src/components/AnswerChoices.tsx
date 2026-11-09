import { BiText } from './BiText'
import { biAria } from '../i18n/format'
import { ANSWER_LABELS } from '../i18n/ui'
import { ANSWER_VALUES, type AnswerValue } from '../types/food'
import { ui } from '../i18n/ui'

interface AnswerChoicesProps {
  disabled?: boolean
  onSelect: (answer: AnswerValue) => void
}

export function AnswerChoices({ disabled = false, onSelect }: AnswerChoicesProps) {
  return (
    <div
      className="answer-choices"
      role="group"
      aria-label={biAria(ui.answerGroupAria)}
    >
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
          <BiText
            copy={ANSWER_LABELS[value]}
            as="span"
            className="answer-choices__text"
          />
        </button>
      ))}
    </div>
  )
}

function symbolFor(value: AnswerValue): string {
  switch (value) {
    case 'dog':
      return '狗'
    case 'cat':
      return '貓'
    case 'both':
      return '雙'
    case 'neither':
      return '否'
    case 'ask-grown-up':
      return '?'
  }
}
