import { useId, useState } from 'react'
import { sources } from '../data/sources'
import { settings } from '../config/settings'

interface AdultInfoPanelProps {
  onOpenAssetPreview?: () => void
}

export function AdultInfoPanel({ onOpenAssetPreview }: AdultInfoPanelProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="adult-info">
      <button
        type="button"
        className="adult-info__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        Grown-ups: safety & sources
      </button>

      {open ? (
        <div id={panelId} className="adult-info__panel">
          <h2>Safety notes</h2>
          <ul>
            <li>
              This is an educational inspection game for ages 6–9, not veterinary
              advice.
            </li>
            <li>
              Always ask a grown-up before offering any food to a real pet.
            </li>
            <li>
              Selected pre-consumer surplus (unused, still-safe food) is
              different from plate scraps or spoiled food.
            </li>
            <li>
              Initial cards are marked draft pending qualified review. Do not
              invent feeding quantities or balanced-meal recipes from this game.
            </li>
          </ul>

          <h3>Sources</h3>
          <ul className="adult-info__sources">
            {sources.map((source) => (
              <li key={source.id}>
                <strong>{source.label}</strong>
                {source.note ? <p>{source.note}</p> : null}
                {source.url ? (
                  <p className="adult-info__url">{source.url}</p>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="adult-info__hint">
            URLs are listed as text only during play. Open them on a separate
            device after the session.
          </p>

          {settings.allowAssetPreview && onOpenAssetPreview ? (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onOpenAssetPreview}
            >
              Open asset preview
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
