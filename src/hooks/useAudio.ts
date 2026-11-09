import { useCallback, useEffect, useRef } from 'react'
import { settings } from '../config/settings'
import { assetUrl } from '../utils/assetUrl'

export type SoundCue = 'correct' | 'retry' | 'complete' | 'tap'

const SOUND_FILES: Record<SoundCue, string> = {
  correct: 'audio/correct.mp3',
  retry: 'audio/retry.mp3',
  complete: 'audio/complete.mp3',
  tap: 'audio/tap.mp3',
}

/**
 * Sound plays only after a player gesture and never autoplays.
 * Call stopAll on screen changes or exhibition reset.
 */
export function useAudio(enabled = settings.soundEnabled) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const unlockedRef = useRef(false)

  const stopAll = useCallback(() => {
    const current = audioRef.current
    if (current) {
      current.pause()
      current.currentTime = 0
    }
  }, [])

  const unlock = useCallback(() => {
    unlockedRef.current = true
  }, [])

  const play = useCallback(
    (cue: SoundCue) => {
      if (!enabled || !unlockedRef.current) return

      stopAll()
      const audio = new Audio(assetUrl(SOUND_FILES[cue]))
      audioRef.current = audio
      void audio.play().catch(() => {
        // Missing or blocked audio should never break play.
      })
    },
    [enabled, stopAll],
  )

  useEffect(() => () => stopAll(), [stopAll])

  return { play, stopAll, unlock }
}
