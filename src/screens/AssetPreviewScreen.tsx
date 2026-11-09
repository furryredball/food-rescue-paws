import { foods } from '../data/foods'
import { SafeImage } from '../components/SafeImage'

interface AssetPreviewScreenProps {
  onBack: () => void
}

const BRANDING = [
  { path: 'branding/logo.svg', label: 'Logo' },
  { path: 'branding/badge.svg', label: 'Completion badge' },
]

const PETS = [
  { path: 'pets/pip-dog.svg', label: 'Pip the dog' },
  { path: 'pets/miso-cat.svg', label: 'Miso the cat' },
]

const AUDIO = [
  { path: 'audio/correct.mp3', label: 'Correct cue' },
  { path: 'audio/retry.mp3', label: 'Retry cue' },
  { path: 'audio/complete.mp3', label: 'Complete cue' },
  { path: 'audio/tap.mp3', label: 'Tap cue' },
]

/** Development helper to review placeholders and swapped assets. */
export function AssetPreviewScreen({ onBack }: AssetPreviewScreenProps) {
  return (
    <section
      className="screen screen--asset-preview"
      aria-labelledby="asset-preview-title"
    >
      <header className="screen-header">
        <h1 id="asset-preview-title">Asset preview</h1>
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Back to welcome
        </button>
      </header>

      <p className="lede">
        Missing files show labelled placeholders instead of broken-image icons.
        Replace files under <code>public/assets/</code> using the same paths.
      </p>

      <h2>Branding</h2>
      <div className="asset-grid">
        {BRANDING.map((item) => (
          <figure key={item.path} className="asset-tile">
            <SafeImage path={item.path} alt={item.label} label={item.label} />
            <figcaption>
              {item.label}
              <code>{item.path}</code>
            </figcaption>
          </figure>
        ))}
      </div>

      <h2>Pet guides</h2>
      <div className="asset-grid">
        {PETS.map((item) => (
          <figure key={item.path} className="asset-tile">
            <SafeImage path={item.path} alt={item.label} label={item.label} />
            <figcaption>
              {item.label}
              <code>{item.path}</code>
            </figcaption>
          </figure>
        ))}
      </div>

      <h2>Food cards</h2>
      <div className="asset-grid">
        {foods.map((food) => (
          <figure key={food.id} className="asset-tile">
            <SafeImage
              path={food.image}
              alt={food.imageAlt}
              label={food.title}
            />
            <figcaption>
              {food.title}
              <code>{food.image}</code>
              <span className="asset-tile__status">{food.reviewStatus}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <h2>Audio paths</h2>
      <ul className="asset-audio-list">
        {AUDIO.map((item) => (
          <li key={item.path}>
            <strong>{item.label}</strong>
            <code>{item.path}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}
