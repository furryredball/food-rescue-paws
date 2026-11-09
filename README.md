# Food Rescue Paws

A short, touch-friendly educational web game for children ages 6–9. Players inspect rescued food with dog and cat guides, choose who it might be for, and always get reminded to ask a grown-up before feeding a real pet.

Built with React, TypeScript, Vite and plain CSS. No backend, accounts, analytics or paid services.

## Play locally

```bash
npm install
npm run dev
```

Then open the printed local URL (default port `4177`).

```bash
npm run build
npm run preview
npm test
```

## How a session works

1. Welcome screen with Pip the dog and Miso the cat
2. Short instructions
3. Six food cards from an eight-card draft deck
4. Friendly feedback (retry once, then reveal)
5. Completion badge and Play again

Answer choices come from editable data in `src/data/foods.ts`:

- Dog
- Cat
- Both
- Neither
- Ask a grown-up (essential information is missing)

One progress paw is awarded per completed card, even if the player needed a retry.

## Editing content

### Food cards

Edit `src/data/foods.ts`. Each card needs:

| Field | Purpose |
| --- | --- |
| `id` | Unique string id |
| `title` | Food name shown to players |
| `image` | Path under `public/assets/` (for example `foods/plain-cooked-chicken.svg`) |
| `imageAlt` | Accessible description |
| `preparation` | Visible preparation details |
| `clues` | Optional tappable clue strings |
| `correctAnswer` | `dog` \| `cat` \| `both` \| `neither` \| `ask-grown-up` |
| `explanation` | Friendly feedback copy |
| `sourceIds` | Ids from `src/data/sources.ts` |
| `reviewStatus` | Keep `draft` until qualified review |

Do not invent nutritional claims or feeding quantities. Explain inspection habits only.

### Sources

Store URLs in `src/data/sources.ts`. During play they appear as text inside the adult information panel — not as tappable external links.

### Session settings

Tune exhibition behaviour in `src/config/settings.ts`:

- `sessionCardCount` — cards per play (default 6)
- `inactivityTimeoutSeconds` — idle time before warning (default 90)
- `resetWarningSeconds` — countdown before auto-reset (default 10)
- `soundEnabled` — master audio toggle

## Replacing assets

Keep files in these folders and reference them with the same relative paths used in data/code (`import.meta.env.BASE_URL` is applied automatically):

```
public/assets/foods/
public/assets/branding/
public/assets/pets/
public/assets/audio/
```

Suggested audio filenames:

- `correct.mp3`
- `retry.mp3`
- `complete.mp3`
- `tap.mp3`

If an image is missing, the UI shows an attractive labelled placeholder instead of a broken-image icon. Do not drop in unlicensed photos.

Open **Grown-ups: safety & sources → Open asset preview** on the welcome screen to review every referenced path.

## Exhibition notes

- Sessions are designed for about 2–3 minutes on an iPad.
- Touch, mouse and keyboard all work; no drag-and-drop.
- After inactivity, a 10-second Continue warning appears, then the game resets for the next visitor.
- Reset clears progress, open clues and feedback, and stops audio.
- Audio never autoplays; a player gesture is required.
- Selected pre-consumer surplus is not the same as plate scraps or spoiled food.

## Deploy to GitHub Pages (subdirectory)

GitHub project sites are served from `https://<user>.github.io/<repo>/`. Vite must set `base` to `/<repo>/` so JS, CSS, favicon and `public/assets` files resolve under that subdirectory.

### How this repo does it

- `vite.config.ts` sets `base` from `BASE_PATH`, or from `GITHUB_REPOSITORY` in Actions, otherwise `/` for local dev.
- Runtime media uses `import.meta.env.BASE_URL` via `src/utils/assetUrl.ts` / `publicUrl()`.
- `index.html` references the favicon as `%BASE_URL%favicon.svg`.
- `.github/workflows/deploy-github-pages.yml` builds with `BASE_PATH=/<repo-name>/` and deploys the `dist/` artifact.

### One-time GitHub setup

1. Push this repository to GitHub.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site will be at `https://<user>.github.io/<repo>/`.

### Local subdirectory build check

```bash
# Uses package.json "name" as the subdirectory, e.g. /food-rescue-paws/
npm run build:gh-pages
npm run preview
```

Or set the path explicitly:

```bash
BASE_PATH=/your-repo-name/ npm run build
```

Open the preview URL and confirm network requests for `/your-repo-name/assets/...` succeed.

If you rename the repository, either keep using the Actions `BASE_PATH` (it follows the repo name) or update `package.json` `name` when using `build:gh-pages` locally.

## Project map

```
src/
  data/foods.ts          Playable card data
  data/sources.ts        Source labels and URLs
  config/settings.ts     Session length, timeout, sound
  game/session.ts        Dealing, scoring, retries, reset
  screens/               Welcome → instructions → play → feedback → badge
  components/            Shared UI
  utils/validation.ts    Unique ids + answer checks
public/assets/           Foods, branding, pets, audio
```

## Safety

This game teaches careful looking. It is not veterinary advice, a feeding calculator, or a balanced-meal planner. Always ask a grown-up before offering food to a pet. Initial content is draft pending qualified review.
