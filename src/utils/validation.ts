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

/** Validate unique IDs and allowed answer values across the card deck. */
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

    if (!card.title.trim()) {
      errors.push(`Card "${card.id}" is missing a title.`)
    }
  }

  return { ok: errors.length === 0, errors }
}
