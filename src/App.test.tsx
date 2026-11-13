import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { settings } from './config/settings'
import { foods } from './data/foods'
import { dealSessionCards } from './game/session'
import { ANSWER_LABELS } from './i18n/ui'

describe('App wiring', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('plays a full correct session through the screens', async () => {
    const user = userEvent.setup()
    const expectedDeck = dealSessionCards(
      foods,
      settings.sessionCardCount,
      () => 0.5,
    )

    render(<App />)

    await user.click(
      screen.getByRole('button', { name: /開始檢查|Start inspecting/i }),
    )
    expect(
      screen.getByRole('heading', { name: /仔細看|Look carefully/i }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /開始吧|Let's go/i }))

    for (const card of expectedDeck) {
      const label = ANSWER_LABELS[card.correctAnswer]
      await user.click(
        screen.getByRole('button', {
          name: new RegExp(`${label.zhHant}|${label.en}`),
        }),
      )
      await user.click(screen.getByRole('button', { name: /下一個|Next/i }))
    }

    expect(screen.getByText(/你做到了|You did it/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /再玩一次|Play again/i }))
    expect(
      screen.getByRole('button', { name: /開始檢查|Start inspecting/i }),
    ).toBeInTheDocument()
  })
})
