import { AnswerChoices } from '../components/AnswerChoices'
import { ClueButtons } from '../components/ClueButtons'
import { ProgressPaws } from '../components/ProgressPaws'
import { SafeImage } from '../components/SafeImage'
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
          <span className="sticker sticker--black">
            Food {cardNumber}/{totalCards}
          </span>
          {card.reviewStatus === 'draft' ? (
            <span className="sticker sticker--yellow">Draft</span>
          ) : null}
        </p>
        <ProgressPaws earned={pawsEarned} total={totalCards} />
      </header>

      <div className="inspection-layout">
        <div className="food-photo-area">
          <SafeImage
            path={card.image}
            alt={card.imageAlt}
            label={card.title}
            className="food-photo-area__image"
          />
        </div>

        <div className="food-details">
          <h1 id="inspection-title">{card.title}</h1>
          <p className="preparation">
            <span className="preparation__label">Preparation</span>
            {card.preparation}
          </p>

          {attemptNumber > 0 ? (
            <p className="attempt-note" role="status">
              Take another careful look — you have one more try.
            </p>
          ) : null}

          <ClueButtons
            clues={card.clues}
            openIndexes={openClueIndexes}
            onToggle={onToggleClue}
          />

          <AnswerChoices onSelect={onAnswer} />

          <p className="reminder reminder--compact">
            Always ask a grown-up before feeding a real pet.
          </p>
        </div>
      </div>
    </section>
  )
}
