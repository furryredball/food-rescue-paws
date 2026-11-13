import { BiText } from './BiText'
import { SafeImage } from './SafeImage'
import type { LocaleCopy } from '../i18n/types'

interface SpeechProps {
  who: 'pip' | 'miso'
  line: LocaleCopy
  className?: string
}

/**
 * One character, one beat, one line. Pip speaks with his dog energy,
 * Miso with hers — the rule from the voice review is that a character
 * never states whether a food is safe; these lines are emotional
 * navigation only.
 */
export function Speech({ who, line, className }: SpeechProps) {
  return (
    <div className={`speech speech--${who}${className ? ` ${className}` : ''}`}>
      <SafeImage
        path={who === 'pip' ? 'pets/pip-dog.jpg' : 'pets/miso-cat.jpg'}
        alt=""
        label=""
        className="speech__art"
      />
      <div className="speech__bubble">
        <BiText copy={line} as="p" className="speech__text" />
        <span className="speech__name" aria-hidden="true">
          {who === 'pip' ? 'Pip 🐾' : 'Miso 😼'}
        </span>
      </div>
    </div>
  )
}
