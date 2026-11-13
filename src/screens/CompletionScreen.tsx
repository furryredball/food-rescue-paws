import { BiText } from '../components/BiText'
import { biAria } from '../i18n/format'
import { ProgressPaws } from '../components/ProgressPaws'
import { SafeImage } from '../components/SafeImage'
import { Speech } from '../components/Speech'
import { ui } from '../i18n/ui'

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
      <BiText
        copy={ui.youDidIt}
        as="span"
        className="sticker sticker--coral"
        mode="inline"
      />
      <SafeImage
        path="branding/badge.svg"
        alt=""
        label={biAria(ui.badgeLabel)}
        className="completion-badge"
      />
      <BiText copy={ui.badgeEarned} as="h1" id="completion-title" />
      <BiText
        copy={ui.completionLede(totalCards, pawsEarned)}
        as="p"
        className="lede"
      />
      <ProgressPaws earned={pawsEarned} total={totalCards} />
      <Speech who="miso" line={ui.misoDone} />
      <BiText copy={ui.reminderAskGrownUp} as="p" className="reminder" />
      <button
        type="button"
        className="btn btn--primary btn--xl"
        onClick={onPlayAgain}
      >
        <BiText copy={ui.playAgain} mode="stack" />
      </button>
    </section>
  )
}
