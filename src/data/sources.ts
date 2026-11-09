import raw from '../content/sources.json'
import type { Source } from '../types/food'

/**
 * Sources loaded from `src/content/sources.json`.
 * Edit that JSON file to change adult-panel labels and notes.
 */
export const sources: Source[] = raw.sources as Source[]
