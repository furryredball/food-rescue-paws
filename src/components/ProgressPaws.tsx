interface ProgressPawsProps {
  earned: number
  total: number
}

export function ProgressPaws({ earned, total }: ProgressPawsProps) {
  return (
    <div
      className="progress-paws"
      role="status"
      aria-label={`${earned} of ${total} paws earned`}
    >
      <span className="progress-paws__label">Paws</span>
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
