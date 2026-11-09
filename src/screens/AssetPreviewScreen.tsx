import { foods } from '../data/foods'
import { BiText } from '../components/BiText'
import { biAria } from '../i18n/format'
import { SafeImage } from '../components/SafeImage'
import { copy } from '../i18n/types'
import { ui } from '../i18n/ui'

interface AssetPreviewScreenProps {
  onBack: () => void
}

const BRANDING = [
  { path: 'branding/logo.svg', label: ui.logo },
  { path: 'branding/badge.svg', label: ui.completionBadge },
]

const PETS = [
  { path: 'pets/pip-dog.svg', label: ui.pipDog },
  { path: 'pets/miso-cat.svg', label: ui.misoCat },
]

const AUDIO = [
  { path: 'audio/correct.mp3', label: copy('答對提示音', 'Correct cue') },
  { path: 'audio/retry.mp3', label: copy('再試提示音', 'Retry cue') },
  { path: 'audio/complete.mp3', label: copy('完成提示音', 'Complete cue') },
  { path: 'audio/tap.mp3', label: copy('點擊提示音', 'Tap cue') },
]

/** Development helper to review placeholders and swapped assets. */
export function AssetPreviewScreen({ onBack }: AssetPreviewScreenProps) {
  return (
    <section
      className="screen screen--asset-preview"
      aria-labelledby="asset-preview-title"
    >
      <header className="screen-header">
        <BiText
          copy={ui.assetPreviewTitle}
          as="h1"
          id="asset-preview-title"
        />
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          <BiText copy={ui.backToWelcome} mode="inline" />
        </button>
      </header>

      <BiText copy={ui.assetPreviewLede} as="p" className="lede" />

      <BiText copy={ui.branding} as="h2" />
      <div className="asset-grid">
        {BRANDING.map((item) => (
          <figure key={item.path} className="asset-tile">
            <SafeImage
              path={item.path}
              alt={biAria(item.label)}
              label={biAria(item.label)}
            />
            <figcaption>
              <BiText copy={item.label} />
              <code>{item.path}</code>
            </figcaption>
          </figure>
        ))}
      </div>

      <BiText copy={ui.petGuides} as="h2" />
      <div className="asset-grid">
        {PETS.map((item) => (
          <figure key={item.path} className="asset-tile">
            <SafeImage
              path={item.path}
              alt={biAria(item.label)}
              label={biAria(item.label)}
            />
            <figcaption>
              <BiText copy={item.label} />
              <code>{item.path}</code>
            </figcaption>
          </figure>
        ))}
      </div>

      <BiText copy={ui.foodCards} as="h2" />
      <div className="asset-grid">
        {foods.map((food) => (
          <figure key={food.id} className="asset-tile">
            <SafeImage
              path={food.image}
              alt={biAria(food.imageAlt)}
              label={biAria(food.title)}
            />
            <figcaption>
              <BiText copy={food.title} />
              <code>{food.image}</code>
              <span className="asset-tile__status">{food.reviewStatus}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <BiText copy={ui.audioPaths} as="h2" />
      <ul className="asset-audio-list">
        {AUDIO.map((item) => (
          <li key={item.path}>
            <BiText copy={item.label} as="strong" />
            <code>{item.path}</code>
          </li>
        ))}
      </ul>
    </section>
  )
}
