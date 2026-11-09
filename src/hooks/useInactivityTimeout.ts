import { useCallback, useEffect, useRef, useState } from 'react'
import { settings } from '../config/settings'
import {
  createInactivityState,
  reduceInactivity,
  type InactivityEffect,
  type InactivityEvent,
  type InactivityState,
} from '../game/inactivityMachine'

interface Options {
  timeoutSeconds?: number
  warningSeconds?: number
  enabled?: boolean
  onReset: () => void
}

/**
 * Exhibition inactivity guard driven by `inactivityMachine`.
 * Phase rules stay in the pure reducer; this hook only owns timers/DOM.
 */
export function useInactivityTimeout({
  timeoutSeconds = settings.inactivityTimeoutSeconds,
  warningSeconds = settings.resetWarningSeconds,
  enabled = true,
  onReset,
}: Options) {
  const [state, setState] = useState<InactivityState>(() =>
    createInactivityState(warningSeconds, enabled),
  )

  const stateRef = useRef(state)
  const idleTimer = useRef<number | null>(null)
  const warningTimer = useRef<number | null>(null)
  const countdownTimer = useRef<number | null>(null)
  const onResetRef = useRef(onReset)
  const timeoutSecondsRef = useRef(timeoutSeconds)
  const warningSecondsRef = useRef(warningSeconds)
  const applyEventRef = useRef<(event: InactivityEvent) => void>(() => {})

  useEffect(() => {
    onResetRef.current = onReset
  }, [onReset])

  useEffect(() => {
    timeoutSecondsRef.current = timeoutSeconds
  }, [timeoutSeconds])

  useEffect(() => {
    warningSecondsRef.current = warningSeconds
  }, [warningSeconds])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const clearTimers = useCallback(() => {
    if (idleTimer.current !== null) window.clearTimeout(idleTimer.current)
    if (warningTimer.current !== null) window.clearTimeout(warningTimer.current)
    if (countdownTimer.current !== null) {
      window.clearInterval(countdownTimer.current)
    }
    idleTimer.current = null
    warningTimer.current = null
    countdownTimer.current = null
  }, [])

  const runEffects = useCallback(
    (effects: InactivityEffect[]) => {
      for (const effect of effects) {
        switch (effect.type) {
          case 'clear_timers':
            clearTimers()
            break
          case 'arm_idle':
            clearTimers()
            idleTimer.current = window.setTimeout(() => {
              applyEventRef.current({ type: 'IDLE_ELAPSED' })
            }, effect.seconds * 1000)
            break
          case 'arm_warning':
            clearTimers()
            countdownTimer.current = window.setInterval(() => {
              applyEventRef.current({ type: 'TICK' })
            }, 1000)
            warningTimer.current = window.setTimeout(() => {
              applyEventRef.current({ type: 'WARNING_ELAPSED' })
            }, effect.seconds * 1000)
            break
          case 'reset_app':
            onResetRef.current()
            break
        }
      }
    },
    [clearTimers],
  )

  const applyEvent = useCallback(
    (event: InactivityEvent) => {
      const transition = reduceInactivity(stateRef.current, event, {
        idleSeconds: timeoutSecondsRef.current,
        warningSeconds: warningSecondsRef.current,
      })
      stateRef.current = transition.state
      setState(transition.state)
      runEffects(transition.effects)
    },
    [runEffects],
  )

  useEffect(() => {
    applyEventRef.current = applyEvent
  }, [applyEvent])

  useEffect(() => {
    if (!enabled) {
      applyEvent({ type: 'DISABLE' })
      return
    }

    applyEvent({ type: 'ENABLE' })

    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'mousemove',
    ]

    const handler = () => {
      if (stateRef.current.status === 'warning') return
      applyEvent({ type: 'ACTIVITY' })
    }

    for (const eventName of events) {
      window.addEventListener(eventName, handler, { passive: true })
    }

    return () => {
      for (const eventName of events) {
        window.removeEventListener(eventName, handler)
      }
      clearTimers()
    }
  }, [applyEvent, clearTimers, enabled])

  const continuePlaying = useCallback(() => {
    applyEvent({ type: 'CONTINUE' })
  }, [applyEvent])

  return {
    warningVisible: state.status === 'warning',
    secondsLeft: state.secondsLeft,
    continuePlaying,
  }
}
