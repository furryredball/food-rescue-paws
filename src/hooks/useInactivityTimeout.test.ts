import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useInactivityTimeout } from './useInactivityTimeout'

describe('useInactivityTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('fires HARD_RESET after idle + warning, and Continue cancels reset', () => {
    const onReset = vi.fn()
    const { result, rerender } = renderHook(
      ({ enabled }) =>
        useInactivityTimeout({
          enabled,
          timeoutSeconds: 5,
          warningSeconds: 3,
          onReset,
        }),
      { initialProps: { enabled: true } },
    )

    expect(result.current.warningVisible).toBe(false)

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(result.current.warningVisible).toBe(true)
    expect(onReset).not.toHaveBeenCalled()

    act(() => {
      result.current.continuePlaying()
    })
    expect(result.current.warningVisible).toBe(false)

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(result.current.warningVisible).toBe(true)

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(onReset).toHaveBeenCalledTimes(1)

    rerender({ enabled: false })
    expect(result.current.warningVisible).toBe(false)
  })

  it('arms idle watching when enable flips on (e.g. asset-preview)', () => {
    const onReset = vi.fn()
    const { result, rerender } = renderHook(
      ({ enabled }) =>
        useInactivityTimeout({
          enabled,
          timeoutSeconds: 2,
          warningSeconds: 1,
          onReset,
        }),
      { initialProps: { enabled: false } },
    )

    expect(result.current.warningVisible).toBe(false)

    rerender({ enabled: true })

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.warningVisible).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
