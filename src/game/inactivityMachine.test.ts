import { describe, expect, it } from 'vitest'
import {
  createInactivityState,
  reduceInactivity,
} from './inactivityMachine'

const options = { idleSeconds: 90, warningSeconds: 10 }

describe('inactivity machine', () => {
  it('arms idle watching on ENABLE', () => {
    const start = createInactivityState(10, false)
    const next = reduceInactivity(start, { type: 'ENABLE' }, options)
    expect(next.state.status).toBe('idle')
    expect(next.effects).toEqual([
      { type: 'clear_timers' },
      { type: 'arm_idle', seconds: 90 },
    ])
  })

  it('moves idle → warning → reset', () => {
    let state = createInactivityState(10, true)
    state = reduceInactivity(state, { type: 'IDLE_ELAPSED' }, options).state
    expect(state.status).toBe('warning')
    expect(state.secondsLeft).toBe(10)

    const expired = reduceInactivity(state, { type: 'WARNING_ELAPSED' }, options)
    expect(expired.state.status).toBe('disabled')
    expect(expired.effects.some((effect) => effect.type === 'reset_app')).toBe(
      true,
    )
  })

  it('Continue returns to idle and ignores ACTIVITY while warning', () => {
    let state = createInactivityState(10, true)
    state = reduceInactivity(state, { type: 'IDLE_ELAPSED' }, options).state

    const ignored = reduceInactivity(state, { type: 'ACTIVITY' }, options)
    expect(ignored.state.status).toBe('warning')
    expect(ignored.effects).toEqual([])

    const continued = reduceInactivity(state, { type: 'CONTINUE' }, options)
    expect(continued.state.status).toBe('idle')
    expect(continued.effects).toContainEqual({
      type: 'arm_idle',
      seconds: 90,
    })
  })

  it('ticks down only while warning', () => {
    let state = createInactivityState(10, true)
    state = reduceInactivity(state, { type: 'IDLE_ELAPSED' }, options).state
    state = reduceInactivity(state, { type: 'TICK' }, options).state
    expect(state.secondsLeft).toBe(9)

    const idle = reduceInactivity(
      { status: 'idle', secondsLeft: 10 },
      { type: 'TICK' },
      options,
    )
    expect(idle.state.secondsLeft).toBe(10)
  })
})
