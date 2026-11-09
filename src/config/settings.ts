/**
 * Single settings file for session length, inactivity timeout and sound.
 * Edit these values for exhibition tuning — no other config files needed.
 */
export const settings = {
  /** Number of distinct food cards dealt each play session. */
  sessionCardCount: 6,

  /** Seconds of inactivity before the reset warning appears. */
  inactivityTimeoutSeconds: 150,

  /** Seconds shown on the reset warning before auto-reset. */
  resetWarningSeconds: 30,

  /** Master sound toggle (still requires a player gesture to play). */
  soundEnabled: true,

  /** Dev-only asset preview can be opened from the adult panel. */
  allowAssetPreview: true,
} as const

export type Settings = typeof settings
