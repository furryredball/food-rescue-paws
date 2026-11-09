/** Exhibition bilingual copy: Traditional Chinese + English. */
export interface LocaleCopy {
  zhHant: string
  en: string
}

export function copy(zhHant: string, en: string): LocaleCopy {
  return { zhHant, en }
}

export function isLocaleCopy(value: unknown): value is LocaleCopy {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as LocaleCopy).zhHant === 'string' &&
    typeof (value as LocaleCopy).en === 'string' &&
    (value as LocaleCopy).zhHant.trim().length > 0 &&
    (value as LocaleCopy).en.trim().length > 0
  )
}
