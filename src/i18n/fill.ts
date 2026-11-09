import type { LocaleCopy } from './types'

/** Replace `{name}` placeholders in bilingual copy. */
export function fill(
  template: LocaleCopy,
  vars: Record<string, string | number>,
): LocaleCopy {
  return {
    zhHant: fillOne(template.zhHant, vars),
    en: fillOne(template.en, vars),
  }
}

function fillOne(text: string, vars: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : `{${key}}`,
  )
}
