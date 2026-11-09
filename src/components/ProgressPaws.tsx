import { ui } from '../i18n/ui'
import { BiText } from './BiText'
import { biAria } from '../i18n/format'

interface ProgressPawsProps {
  earned: number
  total: number
}

export function ProgressPaws({ earned, total }: ProgressPawsProps) {
  return (
    <div
      className="progress-paws"
      role="status"
      aria-label={biAria(ui.pawsAria(earned, total))}
    >
      <BiText copy={ui.paws} as="span" className="progress-paws__label" mode="inline" />
      <ul className="progress-paws__list">
        {Array.from({ length: total }, (_, index) => {
          const filled = index < earned
          return (
            <li
              key={index}
              className={
                filled
                  ? 'progress-paws__paw is-filled'
                  : 'progress-paws__paw'
              }
              aria-hidden="true"
            >
              <span className="progress-paws__icon" />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
