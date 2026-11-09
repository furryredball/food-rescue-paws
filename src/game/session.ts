import { settings } from '../config/settings'
import type { AnswerValue, FoodCard } from '../types/food'
import {
  applyAnswer,
  attemptCount,
  createReadyAttempt,
  isResolved,
  type CardAttempt,
} from './cardPhase'

export type { CardAttempt }

export interface SessionState {
  deck: FoodCard[]
  currentIndex: number
  pawsEarned: number
  attempts: Record<string, CardAttempt>
  openClueIndexes: number[]
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
  const attempts: Record<string, CardAttempt> = {}
  for (const card of deck) {
    attempts[card.id] = createReadyAttempt()
  }
  return {
    deck,
    currentIndex: 0,
    pawsEarned: 0,
    attempts,
    openClueIndexes: [],
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
 * Record an answer for the current card via the card-phase machine.
 * Awards one paw when a card first becomes resolved (correct or revealed).
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
  const next = applyAnswer(prior, answer, card.correctAnswer)
  const pawsEarned =
    next.completed && !isResolved(prior)
      ? session.pawsEarned + 1
      : session.pawsEarned

  return {
    session: {
      ...session,
      pawsEarned,
      openClueIndexes: next.completed ? [] : session.openClueIndexes,
      attempts: {
        ...session.attempts,
        [card.id]: next.attempt,
      },
    },
    correct: next.correct,
    revealed: next.revealed,
    completedCard: next.completed,
  }
}

export function advanceAfterFeedback(session: SessionState): SessionState {
  const card = getCurrentCard(session)
  if (!card) return session
  if (!isResolved(session.attempts[card.id])) return session

  return {
    ...session,
    currentIndex: Math.min(session.currentIndex + 1, session.deck.length),
    openClueIndexes: [],
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

export function currentAttemptCount(session: SessionState): number {
  const card = getCurrentCard(session)
  if (!card) return 0
  return attemptCount(session.attempts[card.id])
}
