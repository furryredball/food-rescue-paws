/**
 * Explicit state machines in Food Rescue Paws
 * ------------------------------------------
 * 1. appMachine      — screen / session / feedback play flow (`reduceApp`)
 * 2. cardPhase       — per-card ready → retry → resolved
 * 3. inactivityMachine — disabled ↔ idle ↔ warning → reset
 * 4. audio gate      — locked → unlocked (in `useAudio`, after gesture)
 *
 * Left as local UI toggles (not app machines):
 * - AdultInfoPanel open/closed
 * - SafeImage ok/failed
 * - clue index set (session field; toggled by app events)
 */

export {
  createAppState,
  inactivityEnabled,
  reduceApp,
  screenOf,
  type AppEvent,
  type AppPhase,
  type AppState,
  type AppTransition,
} from './appMachine'

export {
  applyAnswer,
  attemptCount,
  createReadyAttempt,
  isResolved,
  wasRevealed,
  type CardAttempt,
} from './cardPhase'

export {
  createInactivityState,
  reduceInactivity,
  type InactivityEffect,
  type InactivityEvent,
  type InactivityState,
  type InactivityStatus,
} from './inactivityMachine'

export { SOUND_FILES, type SoundCue } from './sounds'
