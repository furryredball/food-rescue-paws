import { useCallback, useEffect, useMemo, useState } from 'react'
import { foods } from './data/foods'
import { settings } from './config/settings'
import {
  advanceAfterFeedback,
  createSession,
  getCurrentCard,
  isSessionComplete,
  resetSession,
  submitAnswer,
  toggleClue,
  type SessionState,
} from './game/session'
import { useAudio } from './hooks/useAudio'
import { useInactivityTimeout } from './hooks/useInactivityTimeout'
import { InactivityWarning } from './components/InactivityWarning'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { InstructionsScreen } from './screens/InstructionsScreen'
import { InspectionScreen } from './screens/InspectionScreen'
import { FeedbackScreen } from './screens/FeedbackScreen'
import { CompletionScreen } from './screens/CompletionScreen'
import { AssetPreviewScreen } from './screens/AssetPreviewScreen'
import type { AnswerValue, ScreenId } from './types/food'
import { validateFoodCards } from './utils/validation'
import './App.css'

interface FeedbackState {
  correct: boolean
  revealed: boolean
  selectedAnswer: AnswerValue
}

const validation = validateFoodCards(foods)

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('welcome')
  const [session, setSession] = useState<SessionState>(() => createSession(foods))
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const { play, stopAll, unlock } = useAudio(settings.soundEnabled)

  const hardReset = useCallback(() => {
    stopAll()
    setSession(resetSession(foods))
    setFeedback(null)
    setScreen('welcome')
  }, [stopAll])

  const { warningVisible, secondsLeft, continuePlaying } = useInactivityTimeout({
    enabled: screen !== 'welcome' && screen !== 'asset-preview',
    onReset: hardReset,
  })

  useEffect(() => {
    stopAll()
  }, [screen, stopAll])

  const currentCard = useMemo(() => getCurrentCard(session), [session])

  const go = useCallback(
    (next: ScreenId) => {
      unlock()
      setScreen(next)
    },
    [unlock],
  )

  const handleStart = () => {
    unlock()
    play('tap')
    setSession(createSession(foods))
    setFeedback(null)
    go('instructions')
  }

  const handleBeginInspection = () => {
    unlock()
    play('tap')
    go('inspection')
  }

  const handleAnswer = (answer: AnswerValue) => {
    unlock()
    const result = submitAnswer(session, answer)
    setSession(result.session)
    setFeedback({
      correct: result.correct,
      revealed: result.revealed,
      selectedAnswer: answer,
    })
    if (result.correct) {
      play('correct')
    } else {
      play('retry')
    }
    go('feedback')
  }

  const handleFeedbackContinue = () => {
    unlock()
    if (!feedback) return

    if (!feedback.correct && !feedback.revealed) {
      setFeedback(null)
      play('tap')
      go('inspection')
      return
    }

    const advanced = advanceAfterFeedback(session)
    setSession(advanced)
    setFeedback(null)

    if (isSessionComplete(advanced) || !getCurrentCard(advanced)) {
      play('complete')
      go('completion')
      return
    }

    play('tap')
    go('inspection')
  }

  const handlePlayAgain = () => {
    unlock()
    play('tap')
    setSession(createSession(foods))
    setFeedback(null)
    go('welcome')
  }

  if (!validation.ok) {
    return (
      <main className="app-shell">
        <section className="screen">
          <h1>Data validation failed</h1>
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
      {screen === 'welcome' ? (
        <WelcomeScreen
          onStart={handleStart}
          onOpenAssetPreview={() => go('asset-preview')}
        />
      ) : null}

      {screen === 'instructions' ? (
        <InstructionsScreen
          cardCount={settings.sessionCardCount}
          onBack={() => go('welcome')}
          onContinue={handleBeginInspection}
        />
      ) : null}

      {screen === 'inspection' && currentCard ? (
        <InspectionScreen
          card={currentCard}
          cardNumber={session.currentIndex + 1}
          totalCards={session.deck.length}
          pawsEarned={session.pawsEarned}
          openClueIndexes={session.openClueIndexes}
          attemptNumber={session.attempts[currentCard.id]?.attempts ?? 0}
          onToggleClue={(index) => {
            unlock()
            play('tap')
            setSession((prev) => toggleClue(prev, index))
          }}
          onAnswer={handleAnswer}
        />
      ) : null}

      {screen === 'feedback' && currentCard && feedback ? (
        <FeedbackScreen
          card={currentCard}
          correct={feedback.correct}
          revealed={feedback.revealed}
          selectedAnswer={feedback.selectedAnswer}
          onContinue={handleFeedbackContinue}
        />
      ) : null}

      {screen === 'completion' ? (
        <CompletionScreen
          pawsEarned={session.pawsEarned}
          totalCards={session.deck.length}
          onPlayAgain={handlePlayAgain}
        />
      ) : null}

      {screen === 'asset-preview' ? (
        <AssetPreviewScreen onBack={() => go('welcome')} />
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
