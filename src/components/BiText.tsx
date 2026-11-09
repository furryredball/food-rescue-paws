import type { LocaleCopy } from '../i18n/types'

interface BiTextProps {
  copy: LocaleCopy
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div' | 'figcaption' | 'strong' | 'li'
  className?: string
  id?: string
  /** Stacked zh + en (default) or single-line “中文 · English”. */
  mode?: 'stack' | 'inline' | 'zh-only' | 'en-only'
}

/** Exhibition bilingual text: Traditional Chinese + English. */
export function BiText({
  copy,
  as: Tag = 'span',
  className = '',
  id,
  mode = 'stack',
}: BiTextProps) {
  if (mode === 'inline') {
    return (
      <Tag className={`bi-text bi-text--inline ${className}`.trim()} id={id}>
        <span lang="zh-Hant">{copy.zhHant}</span>
        <span className="bi-text__sep" aria-hidden="true">
          {' '}
          ·{' '}
        </span>
        <span lang="en">{copy.en}</span>
      </Tag>
    )
  }

  if (mode === 'zh-only') {
    return (
      <Tag className={className} id={id} lang="zh-Hant">
        {copy.zhHant}
      </Tag>
    )
  }

  if (mode === 'en-only') {
    return (
      <Tag className={className} id={id} lang="en">
        {copy.en}
      </Tag>
    )
  }

  return (
    <Tag className={`bi-text ${className}`.trim()} id={id}>
      <span className="bi-text__zh" lang="zh-Hant">
        {copy.zhHant}
      </span>
      <span className="bi-text__en" lang="en">
        {copy.en}
      </span>
    </Tag>
  )
}
