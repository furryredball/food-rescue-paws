import { AdultInfoPanel } from '../components/AdultInfoPanel'
import { SafeImage } from '../components/SafeImage'

interface WelcomeScreenProps {
  onStart: () => void
  onOpenAssetPreview: () => void
}

export function WelcomeScreen({
  onStart,
  onOpenAssetPreview,
}: WelcomeScreenProps) {
  return (
    <section className="screen screen--welcome" aria-labelledby="welcome-title">
      <div className="brand-lockup">
        <SafeImage
          path="branding/logo.svg"
          alt=""
          label="Food Rescue Paws"
          className="brand-lockup__mark"
        />
        <p className="brand-lockup__name" id="welcome-title">
          Food Rescue Paws
        </p>
      </div>

      <p className="lede">
        Help Pip the dog and Miso the cat inspect rescued food — then always ask
        a grown-up before feeding a real pet.
      </p>

      <div className="hero-stage">
        <div className="hero-stage__stickers" aria-hidden="true">
          <span className="sticker sticker--coral">Ask a grown-up</span>
          <span className="sticker sticker--black">6 foods</span>
          <span className="sticker sticker--sky">2–3 min</span>
        </div>

        <div className="guide-row">
          <figure className="guide-card">
            <SafeImage
              path="pets/pip-dog.svg"
              alt="Pip the friendly dog guide"
              label="Pip the dog"
              className="guide-card__art"
            />
            <figcaption>Pip the dog</figcaption>
          </figure>
          <figure className="guide-card">
            <SafeImage
              path="pets/miso-cat.svg"
              alt="Miso the curious cat guide"
              label="Miso the cat"
              className="guide-card__art"
            />
            <figcaption>Miso the cat</figcaption>
          </figure>
        </div>
      </div>

      <button type="button" className="btn btn--primary btn--xl" onClick={onStart}>
        Start inspecting →
      </button>

      <AdultInfoPanel onOpenAssetPreview={onOpenAssetPreview} />
    </section>
  )
}
