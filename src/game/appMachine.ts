import { settings } from '../config/settings'
import type { AnswerValue, FoodCard, ScreenId } from '../types/food'
import type { SoundCue } from './sounds'
import {
  advanceAfterFeedback,
  createSession,
  getCurrentCard,
  isSessionComplete,
  resetSession,
  submitAnswer,
  toggleClue,
  type SessionState,
} from './session'

/**
 * App play-flow machine (screen + session + feedback).
 *
 * welcome ──START──► instructions ──BEGIN──► inspection ⇄ feedback ──► …
 *    ▲                  │                         │              completion
 *    │                  └──BACK──► welcome         │                 │
 *    │                                             └──PLAY_AGAIN─────┘
 *    └──HARD_RESET (from any active play phase)
 * welcome ⇄ asset-preview
 *
 * Feedback is not a separate nullable blob — it lives only on the
 * `feedback` phase, so inspection/feedback can never desync.
 */

export type AppPhase =
  | { status: 'welcome' }
  | { status: 'instructions' }
  | { status: 'inspection' }
  | {
      status: 'feedback'
      correct: boolean
      revealed: boolean
      selectedAnswer: AnswerValue
    }
  | { status: 'completion' }
  | { status: 'asset-preview' }

export interface AppState {
  phase: AppPhase
  session: SessionState
}

export type AppEvent =
  | { type: 'START' }
  | { type: 'BACK_TO_WELCOME' }
  | { type: 'BEGIN_INSPECTION' }
  | { type: 'OPEN_ASSET_PREVIEW' }
  | { type: 'CLOSE_ASSET_PREVIEW' }
  | { type: 'ANSWER'; answer: AnswerValue }
  | { type: 'FEEDBACK_CONTINUE' }
  | { type: 'TOGGLE_CLUE'; index: number }
  | { type: 'PLAY_AGAIN' }
  | { type: 'HARD_RESET' }

export interface AppTransition {
  state: AppState
  /** Sound to play after a player gesture; omitted = silence. */
  sound?: SoundCue
  /** Always unlock audio on player-driven events. */
  unlock: boolean
  /** Stop any playing cue (screen change / reset). */
  stopAudio: boolean
}

export function createAppState(cards: FoodCard[]): AppState {
  return {
    phase: { status: 'welcome' },
    session: createSession(cards),
  }
}

export function screenOf(phase: AppPhase): ScreenId {
  return phase.status
}

/** Idle reset is off only on welcome so a fresh kiosk stays quiet. */
export function inactivityEnabled(phase: AppPhase): boolean {
  return phase.status !== 'welcome'
}

export function reduceApp(
  state: AppState,
  event: AppEvent,
  cards: FoodCard[],
): AppTransition {
  switch (event.type) {
    case 'START':
      return {
        state: {
          phase: { status: 'instructions' },
          session: createSession(cards),
        },
        sound: 'tap',
        unlock: true,
        stopAudio: true,
      }

    case 'BACK_TO_WELCOME':
      if (state.phase.status !== 'instructions') return ignore(state)
      return {
        state: { ...state, phase: { status: 'welcome' } },
        unlock: true,
        stopAudio: true,
      }

    case 'BEGIN_INSPECTION':
      if (state.phase.status !== 'instructions') return ignore(state)
      return {
        state: { ...state, phase: { status: 'inspection' } },
        sound: 'tap',
        unlock: true,
        stopAudio: true,
      }

    case 'OPEN_ASSET_PREVIEW':
      if (state.phase.status !== 'welcome') return ignore(state)
      if (!settings.allowAssetPreview) return ignore(state)
      return {
        state: { ...state, phase: { status: 'asset-preview' } },
        unlock: true,
        stopAudio: true,
      }

    case 'CLOSE_ASSET_PREVIEW':
      if (state.phase.status !== 'asset-preview') return ignore(state)
      return {
        state: { ...state, phase: { status: 'welcome' } },
        unlock: true,
        stopAudio: true,
      }

    case 'TOGGLE_CLUE': {
      if (state.phase.status !== 'inspection') return ignore(state)
      return {
        state: {
          ...state,
          session: toggleClue(state.session, event.index),
        },
        sound: 'tap',
        unlock: true,
        stopAudio: false,
      }
    }

    case 'ANSWER': {
      if (state.phase.status !== 'inspection') return ignore(state)
      if (!getCurrentCard(state.session)) return ignore(state)

      const result = submitAnswer(state.session, event.answer)
      return {
        state: {
          session: result.session,
          phase: {
            status: 'feedback',
            correct: result.correct,
            revealed: result.revealed,
            selectedAnswer: event.answer,
          },
        },
        sound: result.correct ? 'correct' : 'retry',
        unlock: true,
        stopAudio: true,
      }
    }

    case 'FEEDBACK_CONTINUE': {
      if (state.phase.status !== 'feedback') return ignore(state)
      const feedback = state.phase

      if (!feedback.correct && !feedback.revealed) {
        return {
          state: { ...state, phase: { status: 'inspection' } },
          sound: 'tap',
          unlock: true,
          stopAudio: true,
        }
      }

      const advanced = advanceAfterFeedback(state.session)
      if (isSessionComplete(advanced) || !getCurrentCard(advanced)) {
        return {
          state: {
            session: advanced,
            phase: { status: 'completion' },
          },
          sound: 'complete',
          unlock: true,
          stopAudio: true,
        }
      }

      return {
        state: {
          session: advanced,
          phase: { status: 'inspection' },
        },
        sound: 'tap',
        unlock: true,
        stopAudio: true,
      }
    }

    case 'PLAY_AGAIN':
      if (state.phase.status !== 'completion') return ignore(state)
      return {
        state: createAppState(cards),
        sound: 'tap',
        unlock: true,
        stopAudio: true,
      }

    case 'HARD_RESET':
      return {
        state: {
          phase: { status: 'welcome' },
          session: resetSession(cards),
        },
        unlock: false,
        stopAudio: true,
      }

    default:
      return ignore(state)
  }
}

function ignore(state: AppState): AppTransition {
  return { state, unlock: false, stopAudio: false }
}
