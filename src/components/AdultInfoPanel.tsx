import { useId, useState } from 'react'
import { sources } from '../data/sources'
import { settings } from '../config/settings'
import { ui } from '../i18n/ui'
import { BiText } from './BiText'

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
        <BiText copy={ui.adultToggle} mode="stack" />
      </button>

      {open ? (
        <div id={panelId} className="adult-info__panel">
          <BiText copy={ui.safetyNotes} as="h2" />
          <ul>
            <li>
              <BiText copy={ui.safety1} as="span" />
            </li>
            <li>
              <BiText copy={ui.safety2} as="span" />
            </li>
            <li>
              <BiText copy={ui.safety3} as="span" />
            </li>
            <li>
              <BiText copy={ui.safety4} as="span" />
            </li>
          </ul>

          <BiText copy={ui.sourcesHeading} as="h3" />
          <ul className="adult-info__sources">
            {sources.map((source) => (
              <li key={source.id}>
                <BiText copy={source.label} as="strong" />
                {source.note ? <BiText copy={source.note} as="p" /> : null}
                {source.url ? (
                  <p className="adult-info__url">{source.url}</p>
                ) : null}
              </li>
            ))}
          </ul>
          <BiText copy={ui.sourcesHint} as="p" className="adult-info__hint" />

          {settings.allowAssetPreview && onOpenAssetPreview ? (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onOpenAssetPreview}
            >
              <BiText copy={ui.openAssetPreview} mode="inline" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
