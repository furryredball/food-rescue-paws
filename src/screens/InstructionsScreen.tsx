import { BiText } from '../components/BiText'
import { ui } from '../i18n/ui'

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
  const steps = [
    ui.instruction1,
    ui.instruction2,
    ui.instruction3,
    ui.instruction4(cardCount),
  ]

  return (
    <section
      className="screen screen--instructions"
      aria-labelledby="instructions-title"
    >
      <BiText
        copy={ui.howToPlay}
        as="span"
        className="sticker sticker--orange"
        mode="inline"
      />
      <BiText
        copy={ui.instructionsTitle}
        as="h1"
        id="instructions-title"
      />
      <ol className="instruction-list">
        {steps.map((step, index) => (
          <li key={index}>
            <span className="instruction-list__num" aria-hidden="true">
              {index + 1}
            </span>
            <BiText copy={step} as="span" />
          </li>
        ))}
      </ol>
      <div className="btn-row">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          <BiText copy={ui.back} mode="inline" />
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onContinue}
        >
          <BiText copy={ui.letsGo} mode="stack" />
        </button>
      </div>
    </section>
  )
}
