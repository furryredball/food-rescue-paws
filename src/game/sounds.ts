export type SoundCue = 'correct' | 'retry' | 'complete' | 'tap'

export const SOUND_FILES: Record<SoundCue, string> = {
  correct: 'audio/correct.mp3',
  retry: 'audio/retry.mp3',
  complete: 'audio/complete.mp3',
  tap: 'audio/tap.mp3',
}
