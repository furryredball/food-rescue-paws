import { ui } from '../i18n/ui'
import { BiText } from './BiText'

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
        <BiText copy={ui.stillPlaying} as="h2" id="inactivity-title" />
        <BiText
          copy={ui.inactivityDesc(secondsLeft)}
          as="p"
          id="inactivity-desc"
        />
        <button
          type="button"
          className="btn btn--primary"
          onClick={onContinue}
          autoFocus
        >
          <BiText copy={ui.continue} mode="inline" />
        </button>
      </div>
    </div>
  )
}
