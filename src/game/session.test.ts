import { describe, expect, it } from 'vitest'
import { foods } from '../data/foods'
import { settings } from '../config/settings'
import { validateFoodCards } from '../utils/validation'
import { isResolved } from './cardPhase'
import {
  advanceAfterFeedback,
  createSession,
  dealSessionCards,
  getCurrentCard,
  isSessionComplete,
  resetSession,
  submitAnswer,
  toggleClue,
} from './session'

describe('food card validation', () => {
  it('requires unique ids and valid answers', () => {
    const result = validateFoodCards(foods)
    expect(result.ok).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('flags duplicate ids and bad answers', () => {
    const result = validateFoodCards([
      { ...foods[0], id: 'dup' },
      { ...foods[1], id: 'dup', correctAnswer: 'banana' as never },
    ])
    expect(result.ok).toBe(false)
    expect(result.errors.some((error) => error.includes('Duplicate'))).toBe(
      true,
    )
    expect(result.errors.some((error) => error.includes('invalid'))).toBe(true)
  })
})

describe('session length', () => {
  it('deals the configured number of distinct cards', () => {
    const deck = dealSessionCards(foods, settings.sessionCardCount, () => 0.5)
    expect(deck).toHaveLength(settings.sessionCardCount)
    const ids = deck.map((card) => card.id)
    expect(new Set(ids).size).toBe(settings.sessionCardCount)
  })

  it('starts with eight draft cards available', () => {
    expect(foods).toHaveLength(8)
    expect(foods.every((card) => card.reviewStatus === 'draft')).toBe(true)
  })
})

describe('scoring and retries', () => {
  it('awards one paw on a correct first answer', () => {
    const session = createSession(foods)
    const card = getCurrentCard(session)!
    const result = submitAnswer(session, card.correctAnswer)

    expect(result.correct).toBe(true)
    expect(result.completedCard).toBe(true)
    expect(result.session.pawsEarned).toBe(1)
    expect(isResolved(result.session.attempts[card.id])).toBe(true)
  })

  it('allows one gentle retry before revealing', () => {
    const session = createSession(foods)
    const card = getCurrentCard(session)!
    const wrong =
      card.correctAnswer === 'neither' ? 'dog' : ('neither' as const)

    const first = submitAnswer(session, wrong)
    expect(first.correct).toBe(false)
    expect(first.revealed).toBe(false)
    expect(first.completedCard).toBe(false)
    expect(first.session.pawsEarned).toBe(0)
    expect(first.session.attempts[card.id].status).toBe('retry')

    const second = submitAnswer(first.session, wrong)
    expect(second.correct).toBe(false)
    expect(second.revealed).toBe(true)
    expect(second.completedCard).toBe(true)
    expect(second.session.pawsEarned).toBe(1)
    expect(second.session.attempts[card.id]).toMatchObject({
      status: 'resolved',
      outcome: 'revealed',
    })
  })

  it('still awards only one paw after retries then a correct answer', () => {
    const session = createSession(foods)
    const card = getCurrentCard(session)!
    const wrong =
      card.correctAnswer === 'ask-grown-up' ? 'dog' : ('ask-grown-up' as const)

    const first = submitAnswer(session, wrong)
    const second = submitAnswer(first.session, card.correctAnswer)

    expect(second.correct).toBe(true)
    expect(second.session.pawsEarned).toBe(1)

    const third = submitAnswer(second.session, card.correctAnswer)
    expect(third.completedCard).toBe(false)
    expect(third.session.pawsEarned).toBe(1)
  })
})

describe('reset between players', () => {
  it('clears progress, open clues and feedback state', () => {
    let session = createSession(foods)
    const card = getCurrentCard(session)!
    session = toggleClue(session, 0)
    const answered = submitAnswer(session, card.correctAnswer).session
    const advanced = advanceAfterFeedback(answered)

    expect(advanced.pawsEarned).toBe(1)
    expect(advanced.openClueIndexes).toEqual([])

    const reset = resetSession(foods)
    expect(reset.pawsEarned).toBe(0)
    expect(reset.currentIndex).toBe(0)
    expect(reset.openClueIndexes).toEqual([])
    expect(
      Object.values(reset.attempts).every((item) => item.status === 'ready'),
    ).toBe(true)
  })

  it('marks the session complete after every card is resolved', () => {
    let session = createSession(foods)

    while (!isSessionComplete(session)) {
      const card = getCurrentCard(session)
      if (!card) break
      const result = submitAnswer(session, card.correctAnswer)
      session = advanceAfterFeedback(result.session)
    }

    expect(session.pawsEarned).toBe(settings.sessionCardCount)
    expect(isSessionComplete(session)).toBe(true)
  })
})
