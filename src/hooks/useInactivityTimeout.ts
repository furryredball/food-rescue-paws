import { useCallback, useEffect, useRef, useState } from 'react'
import { settings } from '../config/settings'

interface Options {
  timeoutSeconds?: number
  warningSeconds?: number
  enabled?: boolean
  onReset: () => void
}

/**
 * Exhibition inactivity guard:
 * idle for timeoutSeconds → show warning for warningSeconds → reset.
 */
export function useInactivityTimeout({
  timeoutSeconds = settings.inactivityTimeoutSeconds,
  warningSeconds = settings.resetWarningSeconds,
  enabled = true,
  onReset,
}: Options) {
  const [warningVisible, setWarningVisible] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(warningSeconds)
  const idleTimer = useRef<number | null>(null)
  const warningTimer = useRef<number | null>(null)
  const countdownTimer = useRef<number | null>(null)
  const warningVisibleRef = useRef(false)
  const enabledRef = useRef(enabled)
  const onResetRef = useRef(onReset)
  const timeoutSecondsRef = useRef(timeoutSeconds)
  const warningSecondsRef = useRef(warningSeconds)

  useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  useEffect(() => {
    onResetRef.current = onReset
  }, [onReset])

  useEffect(() => {
    timeoutSecondsRef.current = timeoutSeconds
  }, [timeoutSeconds])

  useEffect(() => {
    warningSecondsRef.current = warningSeconds
  }, [warningSeconds])

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

  const dismissWarning = useCallback(() => {
    warningVisibleRef.current = false
    setWarningVisible(false)
    setSecondsLeft(warningSecondsRef.current)
  }, [])

  const startWarning = useCallback(() => {
    const warnFor = warningSecondsRef.current
    warningVisibleRef.current = true
    setWarningVisible(true)
    setSecondsLeft(warnFor)

    countdownTimer.current = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1))
    }, 1000)

    warningTimer.current = window.setTimeout(() => {
      clearTimers()
      warningVisibleRef.current = false
      setWarningVisible(false)
      onResetRef.current()
    }, warnFor * 1000)
  }, [clearTimers])

  const bumpActivity = useCallback(() => {
    if (!enabledRef.current) return
    clearTimers()
    dismissWarning()
    idleTimer.current = window.setTimeout(() => {
      startWarning()
    }, timeoutSecondsRef.current * 1000)
  }, [clearTimers, dismissWarning, startWarning])

  const continuePlaying = useCallback(() => {
    bumpActivity()
  }, [bumpActivity])

  useEffect(() => {
    if (!enabled) {
      clearTimers()
      warningVisibleRef.current = false
      queueMicrotask(() => {
        setWarningVisible(false)
        setSecondsLeft(warningSecondsRef.current)
      })
      return
    }

    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'keydown',
      'touchstart',
      'mousemove',
    ]

    const handler = () => {
      if (warningVisibleRef.current) return
      bumpActivity()
    }

    for (const event of events) {
      window.addEventListener(event, handler, { passive: true })
    }

    bumpActivity()

    return () => {
      for (const event of events) {
        window.removeEventListener(event, handler)
      }
      clearTimers()
    }
  }, [bumpActivity, clearTimers, enabled])

  return {
    warningVisible,
    secondsLeft,
    continuePlaying,
  }
}
