import { useState } from 'react'
import { assetUrl } from '../utils/assetUrl'

interface SafeImageProps {
  path: string
  alt: string
  className?: string
  label?: string
}

/**
 * Never shows a broken-image icon. Missing assets fall back to a labelled placeholder.
 */
export function SafeImage({ path, alt, className = '', label }: SafeImageProps) {
  const [failed, setFailed] = useState(false)
  const src = assetUrl(path)

  if (failed) {
    return (
      <div
        className={`safe-image-placeholder ${className}`.trim()}
        role="img"
        aria-label={alt}
      >
        <span className="safe-image-placeholder__mark" aria-hidden="true">
          ◇
        </span>
        <span className="safe-image-placeholder__label">
          {label ?? alt}
        </span>
      </div>
    )
  }

  return (
    <img
      className={`safe-image ${className}`.trim()}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      draggable={false}
    />
  )
}
