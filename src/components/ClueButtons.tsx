interface ClueButtonsProps {
  clues: string[]
  openIndexes: number[]
  onToggle: (index: number) => void
}

export function ClueButtons({ clues, openIndexes, onToggle }: ClueButtonsProps) {
  if (clues.length === 0) return null

  return (
    <div className="clue-buttons">
      <p className="clue-buttons__heading">Need a clue?</p>
      <div className="clue-buttons__row" role="group" aria-label="Optional clues">
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
                Clue {index + 1}
              </button>
              {open ? (
                <p id={`clue-panel-${index}`} className="clue-buttons__text">
                  {clue}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
