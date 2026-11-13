import { describe, expect, it } from 'vitest'
import { foods } from '../data/foods'
import { settings } from '../config/settings'
import { createAppState, inactivityEnabled, reduceApp } from './appMachine'
import { getCurrentCard } from './session'

describe('app play-flow machine', () => {
  it('starts on welcome and rejects illegal jumps', () => {
    const start = createAppState(foods)
    expect(start.phase.status).toBe('welcome')

    const illegal = reduceApp(start, { type: 'BEGIN_INSPECTION' }, foods)
    expect(illegal.state.phase.status).toBe('welcome')
  })

  it('walks welcome → instructions → inspection', () => {
    let state = createAppState(foods)
    state = reduceApp(state, { type: 'START' }, foods).state
    expect(state.phase.status).toBe('instructions')

    state = reduceApp(state, { type: 'BEGIN_INSPECTION' }, foods).state
    expect(state.phase.status).toBe('inspection')
    expect(state.session.deck).toHaveLength(settings.sessionCardCount)
  })

  it('keeps feedback data only on the feedback phase', () => {
    let state = createAppState(foods)
    state = reduceApp(state, { type: 'START' }, foods).state
    state = reduceApp(state, { type: 'BEGIN_INSPECTION' }, foods).state

    const card = getCurrentCard(state.session)!
    const wrong =
      card.correctAnswer === 'neither' ? 'dog' : ('neither' as const)

    const answered = reduceApp(
      state,
      { type: 'ANSWER', answer: wrong },
      foods,
    )
    expect(answered.state.phase).toMatchObject({
      status: 'feedback',
      correct: false,
      revealed: false,
    })
    expect(answered.sound).toBe('retry')

    state = reduceApp(answered.state, { type: 'FEEDBACK_CONTINUE' }, foods).state
    expect(state.phase.status).toBe('inspection')
  })

  it('hard reset returns welcome with a fresh session', () => {
    let state = createAppState(foods)
    state = reduceApp(state, { type: 'START' }, foods).state
    state = reduceApp(state, { type: 'BEGIN_INSPECTION' }, foods).state
    const card = getCurrentCard(state.session)!
    state = reduceApp(
      state,
      { type: 'ANSWER', answer: card.correctAnswer },
      foods,
    ).state

    const reset = reduceApp(state, { type: 'HARD_RESET' }, foods)
    expect(reset.state.phase.status).toBe('welcome')
    expect(reset.state.session.pawsEarned).toBe(0)
    expect(reset.stopAudio).toBe(true)
  })

  it('completes a full correct session', () => {
    let state = createAppState(foods)
    state = reduceApp(state, { type: 'START' }, foods).state
    state = reduceApp(state, { type: 'BEGIN_INSPECTION' }, foods).state

    for (let i = 0; i < settings.sessionCardCount; i += 1) {
      const card = getCurrentCard(state.session)!
      state = reduceApp(
        state,
        { type: 'ANSWER', answer: card.correctAnswer },
        foods,
      ).state
      expect(state.phase.status).toBe('feedback')
      state = reduceApp(state, { type: 'FEEDBACK_CONTINUE' }, foods).state
    }

    expect(state.phase.status).toBe('completion')
    expect(state.session.pawsEarned).toBe(settings.sessionCardCount)
  })

  it('ignores a second ANSWER while already on feedback (double-tap)', () => {
    let state = createAppState(foods)
    state = reduceApp(state, { type: 'START' }, foods).state
    state = reduceApp(state, { type: 'BEGIN_INSPECTION' }, foods).state
    const card = getCurrentCard(state.session)!

    const first = reduceApp(
      state,
      { type: 'ANSWER', answer: card.correctAnswer },
      foods,
    )
    expect(first.state.phase.status).toBe('feedback')
    expect(first.state.session.pawsEarned).toBe(1)

    const second = reduceApp(
      first.state,
      { type: 'ANSWER', answer: 'neither' },
      foods,
    )
    expect(second.state).toEqual(first.state)
    expect(second.state.session.pawsEarned).toBe(1)
  })

  it('enables inactivity on asset-preview so a kiosk cannot stick there', () => {
    expect(inactivityEnabled({ status: 'welcome' })).toBe(false)
    expect(inactivityEnabled({ status: 'asset-preview' })).toBe(true)
    expect(inactivityEnabled({ status: 'inspection' })).toBe(true)
  })

  it('ignores FEEDBACK_CONTINUE once the phase has left feedback', () => {
    let state = createAppState(foods)
    state = reduceApp(state, { type: 'START' }, foods).state
    state = reduceApp(state, { type: 'BEGIN_INSPECTION' }, foods).state
    const card = getCurrentCard(state.session)!
    state = reduceApp(
      state,
      { type: 'ANSWER', answer: card.correctAnswer },
      foods,
    ).state
    state = reduceApp(state, { type: 'FEEDBACK_CONTINUE' }, foods).state
    expect(state.phase.status).toBe('inspection')

    const duplicate = reduceApp(state, { type: 'FEEDBACK_CONTINUE' }, foods)
    expect(duplicate.state.phase.status).toBe('inspection')
  })
})
