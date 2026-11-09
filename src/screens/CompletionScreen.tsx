import { ProgressPaws } from '../components/ProgressPaws'
import { SafeImage } from '../components/SafeImage'

interface CompletionScreenProps {
  pawsEarned: number
  totalCards: number
  onPlayAgain: () => void
}

export function CompletionScreen({
  pawsEarned,
  totalCards,
  onPlayAgain,
}: CompletionScreenProps) {
  return (
    <section
      className="screen screen--completion"
      aria-labelledby="completion-title"
    >
      <SafeImage
        path="branding/badge.svg"
        alt=""
        label="Food Rescue badge"
        className="completion-badge"
      />
      <h1 id="completion-title">Food Rescue badge earned!</h1>
      <p className="lede">
        You inspected {totalCards} foods and collected {pawsEarned} progress
        paws. Remember: ask a grown-up before feeding a real pet.
      </p>
      <ProgressPaws earned={pawsEarned} total={totalCards} />
      <button
        type="button"
        className="btn btn--primary btn--xl"
        onClick={onPlayAgain}
      >
        Play again
      </button>
    </section>
  )
}
