import { useId, useState } from 'react'
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
          <BiText copy={ui.adultPanelBody} as="p" />
          <ul>
            <li>
              <BiText copy={ui.safety5} as="span" />
            </li>
          </ul>

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
