interface InstructionsScreenProps {
  onContinue: () => void
  onBack: () => void
  cardCount: number
}

export function InstructionsScreen({
  onContinue,
  onBack,
  cardCount,
}: InstructionsScreenProps) {
  return (
    <section
      className="screen screen--instructions"
      aria-labelledby="instructions-title"
    >
      <span className="sticker sticker--orange">How to play</span>
      <h1 id="instructions-title">Look closely. Choose carefully.</h1>
      <ol className="instruction-list">
        <li>
          <span className="instruction-list__num" aria-hidden="true">
            1
          </span>
          <span>Look at the food photo, name and preparation details.</span>
        </li>
        <li>
          <span className="instruction-list__num" aria-hidden="true">
            2
          </span>
          <span>Tap optional clues if you want a hint.</span>
        </li>
        <li>
          <span className="instruction-list__num" aria-hidden="true">
            3
          </span>
          <span>
            Choose who it might be for: Dog, Cat, Both, Neither, or Ask a
            grown-up.
          </span>
        </li>
        <li>
          <span className="instruction-list__num" aria-hidden="true">
            4
          </span>
          <span>
            Earn one paw for each of {cardCount} foods you finish. You can try
            again if your first guess needs another look.
          </span>
        </li>
      </ol>
      <p className="reminder">
        Reminder: always ask a grown-up before offering food to a real pet.
      </p>
      <div className="btn-row">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onContinue}
        >
          Let’s go →
        </button>
      </div>
    </section>
  )
}
