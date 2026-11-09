import { AnswerChoices } from '../components/AnswerChoices'
import { BiText } from '../components/BiText'
import { biAria } from '../i18n/format'
import { ClueButtons } from '../components/ClueButtons'
import { ProgressPaws } from '../components/ProgressPaws'
import { SafeImage } from '../components/SafeImage'
import { ui } from '../i18n/ui'
import type { AnswerValue, FoodCard } from '../types/food'

interface InspectionScreenProps {
  card: FoodCard
  cardNumber: number
  totalCards: number
  pawsEarned: number
  openClueIndexes: number[]
  attemptNumber: number
  onToggleClue: (index: number) => void
  onAnswer: (answer: AnswerValue) => void
}

export function InspectionScreen({
  card,
  cardNumber,
  totalCards,
  pawsEarned,
  openClueIndexes,
  attemptNumber,
  onToggleClue,
  onAnswer,
}: InspectionScreenProps) {
  return (
    <section
      className="screen screen--inspection"
      aria-labelledby="inspection-title"
    >
      <header className="screen-header">
        <p className="eyebrow">
          <BiText
            copy={ui.foodProgress(cardNumber, totalCards)}
            as="span"
            className="sticker sticker--black"
            mode="inline"
          />
          {card.reviewStatus === 'draft' ? (
            <BiText
              copy={ui.draft}
              as="span"
              className="sticker sticker--yellow"
              mode="inline"
            />
          ) : null}
        </p>
        <ProgressPaws earned={pawsEarned} total={totalCards} />
      </header>

      <div className="inspection-layout">
        <div className="food-photo-area">
          <SafeImage
            path={card.image}
            alt={biAria(card.imageAlt)}
            label={biAria(card.title)}
            className="food-photo-area__image"
          />
        </div>

        <div className="food-details">
          <BiText copy={card.title} as="h1" id="inspection-title" />
          <div className="preparation">
            <BiText
              copy={ui.preparation}
              as="span"
              className="preparation__label"
              mode="inline"
            />
            <BiText copy={card.preparation} as="p" />
          </div>

          {attemptNumber > 0 ? (
            <BiText
              copy={ui.attemptNote}
              as="p"
              className="attempt-note"
            />
          ) : null}

          <ClueButtons
            clues={card.clues}
            openIndexes={openClueIndexes}
            onToggle={onToggleClue}
          />

          <AnswerChoices onSelect={onAnswer} />

          <BiText
            copy={ui.reminderCompact}
            as="p"
            className="reminder reminder--compact"
          />
        </div>
      </div>
    </section>
  )
}
