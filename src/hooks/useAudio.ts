import { useCallback, useEffect, useRef } from 'react'
import { settings } from '../config/settings'
import { SOUND_FILES, type SoundCue } from '../game/sounds'
import { assetUrl } from '../utils/assetUrl'

export type { SoundCue }

/**
 * Audio gate machine: locked → unlocked (after a player gesture).
 * Sound never autoplays; stopAll on screen change / reset.
 */
export function useAudio(enabled = settings.soundEnabled) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const gateRef = useRef<'locked' | 'unlocked'>('locked')

  const stopAll = useCallback(() => {
    const current = audioRef.current
    if (current) {
      current.pause()
      current.currentTime = 0
    }
  }, [])

  const unlock = useCallback(() => {
    gateRef.current = 'unlocked'
  }, [])

  const play = useCallback(
    (cue: SoundCue) => {
      if (!enabled || gateRef.current !== 'unlocked') return

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
