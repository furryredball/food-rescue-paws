import { isLocaleCopy } from '../i18n/types'
import { ANSWER_VALUES, type AnswerValue, type FoodCard } from '../types/food'

export interface ValidationResult {
  ok: boolean
  errors: string[]
}

export function isValidAnswer(value: unknown): value is AnswerValue {
  return (
    typeof value === 'string' &&
    (ANSWER_VALUES as readonly string[]).includes(value)
  )
}

/** Validate unique IDs, bilingual fields, and allowed answer values. */
export function validateFoodCards(cards: FoodCard[]): ValidationResult {
  const errors: string[] = []
  const seen = new Set<string>()

  for (const card of cards) {
    if (!card.id.trim()) {
      errors.push('A food card is missing an id.')
      continue
    }

    if (seen.has(card.id)) {
      errors.push(`Duplicate food card id: "${card.id}".`)
    }
    seen.add(card.id)

    if (!isValidAnswer(card.correctAnswer)) {
      errors.push(
        `Card "${card.id}" has invalid correctAnswer: "${String(card.correctAnswer)}".`,
      )
    }

    if (!isLocaleCopy(card.title)) {
      errors.push(`Card "${card.id}" needs bilingual title (zhHant + en).`)
    }
    if (!isLocaleCopy(card.preparation)) {
      errors.push(`Card "${card.id}" needs bilingual preparation.`)
    }
    if (!isLocaleCopy(card.explanation)) {
      errors.push(`Card "${card.id}" needs bilingual explanation.`)
    }
    if (!isLocaleCopy(card.imageAlt)) {
      errors.push(`Card "${card.id}" needs bilingual imageAlt.`)
    }
    if (!Array.isArray(card.clues) || card.clues.some((clue) => !isLocaleCopy(clue))) {
      errors.push(`Card "${card.id}" clues must be bilingual.`)
    }
  }

  return { ok: errors.length === 0, errors }
}
