import { describe, expect, it } from 'vitest'
import { foods } from '../data/foods'
import { validateFoodCards } from '../utils/validation'
import { ANSWER_LABELS, ui } from './ui'
import { isLocaleCopy } from './types'

describe('bilingual copy', () => {
  it('keeps core UI strings in Traditional Chinese and English', () => {
    expect(isLocaleCopy(ui.brandName)).toBe(true)
    expect(ui.brandName.zhHant).toContain('食物')
    expect(ui.brandName.en).toContain('Food Rescue')
    expect(ANSWER_LABELS['ask-grown-up'].zhHant).toBe('先問大人')
    expect(ANSWER_LABELS.dog.en).toBe('Dog')
  })

  it('requires bilingual fields on every food card', () => {
    const result = validateFoodCards(foods)
    expect(result.ok).toBe(true)
    for (const card of foods) {
      expect(card.title.zhHant.length).toBeGreaterThan(0)
      expect(card.title.en.length).toBeGreaterThan(0)
      expect(card.clues.every((clue) => isLocaleCopy(clue))).toBe(true)
    }
  })
})
