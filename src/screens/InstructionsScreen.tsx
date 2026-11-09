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
      <h1 id="instructions-title">How to play</h1>
      <ol className="instruction-list">
        <li>Look at the food photo, name and preparation details.</li>
        <li>Tap optional clues if you want a hint.</li>
        <li>
          Choose who it might be for: Dog, Cat, Both, Neither, or Ask a
          grown-up.
        </li>
        <li>
          Earn one paw for each of {cardCount} foods you finish. You can try
          again if your first guess needs another look.
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
          Let’s go
        </button>
      </div>
    </section>
  )
}
