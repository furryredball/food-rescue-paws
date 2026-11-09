interface InactivityWarningProps {
  secondsLeft: number
  onContinue: () => void
}

export function InactivityWarning({
  secondsLeft,
  onContinue,
}: InactivityWarningProps) {
  return (
    <div
      className="inactivity-warning"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="inactivity-title"
      aria-describedby="inactivity-desc"
    >
      <div className="inactivity-warning__panel">
        <h2 id="inactivity-title">Still playing?</h2>
        <p id="inactivity-desc">
          This game will restart in {secondsLeft} second
          {secondsLeft === 1 ? '' : 's'} so the next visitor can play.
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onContinue}
          autoFocus
        >
          Continue
        </button>
      </div>
    </div>
  )
}
