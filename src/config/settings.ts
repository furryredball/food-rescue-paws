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

  /**
   * Master sound toggle (still requires a player gesture to play).
   * Off by default until MP3 cues exist under public/assets/audio/ (UX-01).
   */
  soundEnabled: false,

  /**
   * Asset preview is for local content checks only (BUG-01).
   * Hidden in production builds so a kiosk cannot stick on that screen.
   */
  allowAssetPreview: import.meta.env.DEV,
} as const

export type Settings = typeof settings
