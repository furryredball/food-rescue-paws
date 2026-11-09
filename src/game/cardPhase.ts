import type { AnswerValue } from '../types/food'

/**
 * Explicit per-card attempt machine.
 *
 * ready  --answer correct--> resolved(correct)
 * ready  --answer wrong----> retry
 * retry  --answer correct--> resolved(correct)
 * retry  --answer wrong----> resolved(revealed)
 * resolved --*--> resolved (no-op)
 */
export type CardAttempt =
  | { status: 'ready' }
  | { status: 'retry'; lastAnswer: AnswerValue }
  | {
      status: 'resolved'
      lastAnswer: AnswerValue
      outcome: 'correct' | 'revealed'
      attempts: 1 | 2
    }

export function createReadyAttempt(): CardAttempt {
  return { status: 'ready' }
}

export function attemptCount(attempt: CardAttempt): number {
  if (attempt.status === 'ready') return 0
  if (attempt.status === 'retry') return 1
  return attempt.attempts
}

export function isResolved(attempt: CardAttempt): boolean {
  return attempt.status === 'resolved'
}

export function wasRevealed(attempt: CardAttempt): boolean {
  return attempt.status === 'resolved' && attempt.outcome === 'revealed'
}

export function applyAnswer(
  attempt: CardAttempt,
  answer: AnswerValue,
  correctAnswer: AnswerValue,
): { attempt: CardAttempt; correct: boolean; revealed: boolean; completed: boolean } {
  if (attempt.status === 'resolved') {
    return {
      attempt,
      correct: attempt.outcome === 'correct',
      revealed: attempt.outcome === 'revealed',
      completed: false,
    }
  }

  const correct = answer === correctAnswer
  if (correct) {
    const attempts = attempt.status === 'ready' ? 1 : 2
    return {
      attempt: {
        status: 'resolved',
        lastAnswer: answer,
        outcome: 'correct',
        attempts: attempts as 1 | 2,
      },
      correct: true,
      revealed: false,
      completed: true,
    }
  }

  if (attempt.status === 'ready') {
    return {
      attempt: { status: 'retry', lastAnswer: answer },
      correct: false,
      revealed: false,
      completed: false,
    }
  }

  return {
    attempt: {
      status: 'resolved',
      lastAnswer: answer,
      outcome: 'revealed',
      attempts: 2,
    },
    correct: false,
    revealed: true,
    completed: true,
  }
}
