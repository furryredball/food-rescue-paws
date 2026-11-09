import type { LocaleCopy } from './types'

/** Accessible label joining both languages for aria-* attributes. */
export function biAria(copy: LocaleCopy): string {
  return `${copy.zhHant} / ${copy.en}`
}
