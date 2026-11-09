import type { LocaleCopy } from '../i18n/types'
import { ui } from '../i18n/ui'
import { BiText } from './BiText'
import { biAria } from '../i18n/format'

interface ClueButtonsProps {
  clues: LocaleCopy[]
  openIndexes: number[]
  onToggle: (index: number) => void
}

export function ClueButtons({ clues, openIndexes, onToggle }: ClueButtonsProps) {
  if (clues.length === 0) return null

  return (
    <div className="clue-buttons">
      <BiText copy={ui.needClue} as="p" className="clue-buttons__heading" />
      <div
        className="clue-buttons__row"
        role="group"
        aria-label={biAria(ui.cluesGroupAria)}
      >
        {clues.map((clue, index) => {
          const open = openIndexes.includes(index)
          return (
            <div key={index} className="clue-buttons__item">
              <button
                type="button"
                className={
                  open
                    ? 'clue-buttons__toggle is-open'
                    : 'clue-buttons__toggle'
                }
                aria-expanded={open}
                aria-controls={`clue-panel-${index}`}
                onClick={() => onToggle(index)}
              >
                <BiText copy={ui.clueN(index + 1)} mode="inline" />
              </button>
              {open ? (
                <BiText
                  copy={clue}
                  as="p"
                  id={`clue-panel-${index}`}
                  className="clue-buttons__text"
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
