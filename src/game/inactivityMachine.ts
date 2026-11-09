/**
 * Exhibition inactivity machine.
 *
 * disabled ──ENABLE──► idle ──IDLE_ELAPSED──► warning ──WARNING_ELAPSED──► (effect: reset)
 *   ▲                    ▲                      │
 *   │                    └──CONTINUE/ACTIVITY───┘
 *   └──DISABLE── from idle|warning
 *
 * Timer side-effects are returned explicitly so React only runs clocks —
 * phase rules live here for humans and agents to read.
 */

export type InactivityStatus = 'disabled' | 'idle' | 'warning'

export interface InactivityState {
  status: InactivityStatus
  secondsLeft: number
}

export type InactivityEvent =
  | { type: 'ENABLE' }
  | { type: 'DISABLE' }
  | { type: 'ACTIVITY' }
  | { type: 'IDLE_ELAPSED' }
  | { type: 'TICK' }
  | { type: 'CONTINUE' }
  | { type: 'WARNING_ELAPSED' }

export type InactivityEffect =
  | { type: 'clear_timers' }
  | { type: 'arm_idle'; seconds: number }
  | { type: 'arm_warning'; seconds: number }
  | { type: 'reset_app' }

export interface InactivityTransition {
  state: InactivityState
  effects: InactivityEffect[]
}

export function createInactivityState(
  warningSeconds: number,
  enabled = false,
): InactivityState {
  return {
    status: enabled ? 'idle' : 'disabled',
    secondsLeft: warningSeconds,
  }
}

export function reduceInactivity(
  state: InactivityState,
  event: InactivityEvent,
  options: { idleSeconds: number; warningSeconds: number },
): InactivityTransition {
  const { idleSeconds, warningSeconds } = options

  switch (event.type) {
    case 'DISABLE':
      return {
        state: { status: 'disabled', secondsLeft: warningSeconds },
        effects: [{ type: 'clear_timers' }],
      }

    case 'ENABLE':
      return {
        state: { status: 'idle', secondsLeft: warningSeconds },
        effects: [
          { type: 'clear_timers' },
          { type: 'arm_idle', seconds: idleSeconds },
        ],
      }

    case 'ACTIVITY':
      if (state.status === 'disabled' || state.status === 'warning') {
        return { state, effects: [] }
      }
      return {
        state: { status: 'idle', secondsLeft: warningSeconds },
        effects: [
          { type: 'clear_timers' },
          { type: 'arm_idle', seconds: idleSeconds },
        ],
      }

    case 'CONTINUE':
      if (state.status !== 'warning') return { state, effects: [] }
      return {
        state: { status: 'idle', secondsLeft: warningSeconds },
        effects: [
          { type: 'clear_timers' },
          { type: 'arm_idle', seconds: idleSeconds },
        ],
      }

    case 'IDLE_ELAPSED':
      if (state.status !== 'idle') return { state, effects: [] }
      return {
        state: { status: 'warning', secondsLeft: warningSeconds },
        effects: [{ type: 'arm_warning', seconds: warningSeconds }],
      }

    case 'TICK':
      if (state.status !== 'warning') return { state, effects: [] }
      return {
        state: {
          ...state,
          secondsLeft: Math.max(0, state.secondsLeft - 1),
        },
        effects: [],
      }

    case 'WARNING_ELAPSED':
      if (state.status !== 'warning') return { state, effects: [] }
      return {
        state: { status: 'disabled', secondsLeft: warningSeconds },
        effects: [{ type: 'clear_timers' }, { type: 'reset_app' }],
      }

    default:
      return { state, effects: [] }
  }
}
