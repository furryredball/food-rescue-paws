import { useCallback, useEffect, useRef, useState } from 'react'
import { foods } from './data/foods'
import { settings } from './config/settings'
import {
  createAppState,
  inactivityEnabled,
  reduceApp,
  type AppEvent,
  type AppState,
} from './game/appMachine'
import { currentAttemptCount, getCurrentCard } from './game/session'
import { useAudio } from './hooks/useAudio'
import { useInactivityTimeout } from './hooks/useInactivityTimeout'
import { InactivityWarning } from './components/InactivityWarning'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { InstructionsScreen } from './screens/InstructionsScreen'
import { InspectionScreen } from './screens/InspectionScreen'
import { FeedbackScreen } from './screens/FeedbackScreen'
import { CompletionScreen } from './screens/CompletionScreen'
import { AssetPreviewScreen } from './screens/AssetPreviewScreen'
import { BiText } from './components/BiText'
import { ui } from './i18n/ui'
import { validateFoodCards } from './utils/validation'
import './App.css'

const validation = validateFoodCards(foods)

export default function App() {
  const { play, stopAll, unlock } = useAudio(settings.soundEnabled)
  const [state, setState] = useState<AppState>(() => createAppState(foods))
  const stateRef = useRef(state)
  const audioApi = useRef({ play, stopAll, unlock })

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    audioApi.current = { play, stopAll, unlock }
  }, [play, stopAll, unlock])

  const send = useCallback((event: AppEvent) => {
    const transition = reduceApp(stateRef.current, event, foods)
    stateRef.current = transition.state
    setState(transition.state)

    const audio = audioApi.current
    if (transition.unlock) audio.unlock()
    if (transition.stopAudio) audio.stopAll()
    if (transition.sound) audio.play(transition.sound)
  }, [])

  const hardReset = useCallback(() => {
    send({ type: 'HARD_RESET' })
  }, [send])

  const { warningVisible, secondsLeft, continuePlaying } = useInactivityTimeout({
    enabled: inactivityEnabled(state.phase),
    onReset: hardReset,
  })

  const { phase, session } = state
  const currentCard = getCurrentCard(session)

  if (!validation.ok) {
    return (
      <main className="app-shell">
        <section className="screen">
          <BiText copy={ui.validationFailed} as="h1" />
          <ul>
            {validation.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      {phase.status === 'welcome' ? (
        <WelcomeScreen
          onStart={() => send({ type: 'START' })}
          onOpenAssetPreview={() => send({ type: 'OPEN_ASSET_PREVIEW' })}
        />
      ) : null}

      {phase.status === 'instructions' ? (
        <InstructionsScreen
          cardCount={settings.sessionCardCount}
          onBack={() => send({ type: 'BACK_TO_WELCOME' })}
          onContinue={() => send({ type: 'BEGIN_INSPECTION' })}
        />
      ) : null}

      {phase.status === 'inspection' && currentCard ? (
        <InspectionScreen
          card={currentCard}
          cardNumber={session.currentIndex + 1}
          totalCards={session.deck.length}
          pawsEarned={session.pawsEarned}
          openClueIndexes={session.openClueIndexes}
          attemptNumber={currentAttemptCount(session)}
          onToggleClue={(index) => send({ type: 'TOGGLE_CLUE', index })}
          onAnswer={(answer) => send({ type: 'ANSWER', answer })}
        />
      ) : null}

      {phase.status === 'feedback' && currentCard ? (
        <FeedbackScreen
          card={currentCard}
          correct={phase.correct}
          revealed={phase.revealed}
          selectedAnswer={phase.selectedAnswer}
          onContinue={() => send({ type: 'FEEDBACK_CONTINUE' })}
        />
      ) : null}

      {phase.status === 'completion' ? (
        <CompletionScreen
          pawsEarned={session.pawsEarned}
          totalCards={session.deck.length}
          onPlayAgain={() => send({ type: 'PLAY_AGAIN' })}
        />
      ) : null}

      {phase.status === 'asset-preview' ? (
        <AssetPreviewScreen
          onBack={() => send({ type: 'CLOSE_ASSET_PREVIEW' })}
        />
      ) : null}

      {warningVisible ? (
        <InactivityWarning
          secondsLeft={secondsLeft}
          onContinue={() => {
            unlock()
            continuePlaying()
          }}
        />
      ) : null}
    </main>
  )
}
