import { describe, expect, it } from 'vitest'
import { foods } from '../data/foods'
import { settings } from '../config/settings'
import { createAppState, reduceApp } from './appMachine'
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
})
