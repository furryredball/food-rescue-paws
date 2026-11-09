import { settings } from '../config/settings'
import type { AnswerValue, FoodCard } from '../types/food'

export interface CardAttemptState {
  cardId: string
  attempts: number
  resolved: boolean
  lastAnswer: AnswerValue | null
  revealed: boolean
}

export interface SessionState {
  deck: FoodCard[]
  currentIndex: number
  pawsEarned: number
  attempts: Record<string, CardAttemptState>
  openClueIndexes: number[]
  lastFeedbackCorrect: boolean | null
}

export function shuffleInPlace<T>(items: T[], random = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Pick `count` distinct cards from the draft deck for one exhibition session. */
export function dealSessionCards(
  cards: FoodCard[],
  count = settings.sessionCardCount,
  random = Math.random,
): FoodCard[] {
  if (count < 1) {
    throw new Error('Session must include at least one card.')
  }
  if (cards.length < count) {
    throw new Error(
      `Need at least ${count} food cards, found ${cards.length}.`,
    )
  }
  return shuffleInPlace(cards, random).slice(0, count)
}

export function createSession(cards: FoodCard[]): SessionState {
  const deck = dealSessionCards(cards)
  const attempts: Record<string, CardAttemptState> = {}
  for (const card of deck) {
    attempts[card.id] = {
      cardId: card.id,
      attempts: 0,
      resolved: false,
      lastAnswer: null,
      revealed: false,
    }
  }
  return {
    deck,
    currentIndex: 0,
    pawsEarned: 0,
    attempts,
    openClueIndexes: [],
    lastFeedbackCorrect: null,
  }
}

export function getCurrentCard(session: SessionState): FoodCard | null {
  return session.deck[session.currentIndex] ?? null
}

export function isSessionComplete(session: SessionState): boolean {
  return session.pawsEarned >= session.deck.length
}

export interface AnswerResult {
  session: SessionState
  correct: boolean
  revealed: boolean
  completedCard: boolean
}

/**
 * Record an answer for the current card.
 * - Correct: award one paw (once), mark resolved.
 * - First wrong: gentle retry, do not advance.
 * - Second wrong: reveal answer, award one paw, mark resolved.
 */
export function submitAnswer(
  session: SessionState,
  answer: AnswerValue,
): AnswerResult {
  const card = getCurrentCard(session)
  if (!card) {
    throw new Error('No current card to answer.')
  }

  const prior = session.attempts[card.id]
  if (prior.resolved) {
    return {
      session,
      correct: prior.lastAnswer === card.correctAnswer,
      revealed: prior.revealed,
      completedCard: false,
    }
  }

  const correct = answer === card.correctAnswer
  const attempts = prior.attempts + 1
  const revealed = !correct && attempts >= 2
  const completedCard = correct || revealed
  const pawsEarned =
    completedCard && !prior.resolved
      ? session.pawsEarned + 1
      : session.pawsEarned

  const nextAttempts: CardAttemptState = {
    cardId: card.id,
    attempts,
    resolved: completedCard,
    lastAnswer: answer,
    revealed,
  }

  return {
    session: {
      ...session,
      pawsEarned,
      openClueIndexes: completedCard ? [] : session.openClueIndexes,
      lastFeedbackCorrect: correct,
      attempts: {
        ...session.attempts,
        [card.id]: nextAttempts,
      },
    },
    correct,
    revealed,
    completedCard,
  }
}

export function advanceAfterFeedback(session: SessionState): SessionState {
  const card = getCurrentCard(session)
  if (!card) return session
  const state = session.attempts[card.id]
  if (!state.resolved) return session

  return {
    ...session,
    currentIndex: Math.min(session.currentIndex + 1, session.deck.length),
    openClueIndexes: [],
    lastFeedbackCorrect: null,
  }
}

export function toggleClue(
  session: SessionState,
  clueIndex: number,
): SessionState {
  const open = new Set(session.openClueIndexes)
  if (open.has(clueIndex)) {
    open.delete(clueIndex)
  } else {
    open.add(clueIndex)
  }
  return {
    ...session,
    openClueIndexes: [...open].sort((a, b) => a - b),
  }
}

export function resetSession(cards: FoodCard[]): SessionState {
  return createSession(cards)
}
