import { AdultInfoPanel } from '../components/AdultInfoPanel'
import { BiText } from '../components/BiText'
import { foods } from '../data/foods'
import { biAria } from '../i18n/format'
import { SafeImage } from '../components/SafeImage'
import { ui } from '../i18n/ui'

interface WelcomeScreenProps {
  onStart: () => void
  onOpenAssetPreview: () => void
}

export function WelcomeScreen({
  onStart,
  onOpenAssetPreview,
}: WelcomeScreenProps) {
  const needsReviewBanner = foods.some(
    (card) => card.reviewStatus !== 'reviewed',
  )

  return (
    <section className="screen screen--welcome" aria-labelledby="welcome-title">
      <div className="brand-lockup">
        <SafeImage
          path="branding/logo.svg"
          alt=""
          label={biAria(ui.brandName)}
          className="brand-lockup__mark"
        />
        <BiText
          copy={ui.brandName}
          as="p"
          className="brand-lockup__name"
          id="welcome-title"
        />
      </div>

      <BiText copy={ui.welcomeLede} as="p" className="lede" />

      {needsReviewBanner ? (
        <p className="content-draft-banner" role="status">
          <BiText copy={ui.contentDraftBanner} as="span" />
        </p>
      ) : null}

      <div className="hero-stage">
        <div className="hero-stage__stickers" aria-hidden="true">
          <BiText
            copy={ui.stickerSixFoods}
            as="span"
            className="sticker sticker--black"
            mode="inline"
          />
          <BiText
            copy={ui.stickerSessionTime}
            as="span"
            className="sticker sticker--sky"
            mode="inline"
          />
        </div>

        <div className="guide-row">
          <figure className="guide-card">
            <SafeImage
              path="pets/pip-dog.svg"
              alt={biAria(ui.pipDog)}
              label={biAria(ui.pipDog)}
              className="guide-card__art"
            />
            <BiText copy={ui.pipDog} as="figcaption" mode="stack" />
          </figure>
          <figure className="guide-card">
            <SafeImage
              path="pets/miso-cat.svg"
              alt={biAria(ui.misoCat)}
              label={biAria(ui.misoCat)}
              className="guide-card__art"
            />
            <BiText copy={ui.misoCat} as="figcaption" mode="stack" />
          </figure>
        </div>
      </div>

      <button type="button" className="btn btn--primary btn--xl" onClick={onStart}>
        <BiText copy={ui.startInspecting} mode="stack" />
      </button>

      <AdultInfoPanel onOpenAssetPreview={onOpenAssetPreview} />
    </section>
  )
}
