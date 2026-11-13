# Food Rescue Paws / 爪爪救食大作戰

A short, touch-friendly educational web game for children. Players inspect rescued food with dog and cat guides, choose who it might be for, and always get reminded to ask a grown-up before feeding a real pet.

**Bilingual exhibition UI:** Traditional Chinese (`zh-Hant`) and English are shown together. **Edit text directly** in the JSON files under `src/content/` (`ui.json`, `foods.json`) — see `src/content/README.md`.

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
npm run lint
```

## How a session works

1. Welcome screen with Pip the dog and Miso the cat
2. Short instructions
3. Six food cards from the deck in `src/content/foods.json`
4. Friendly feedback (retry once, then reveal)
5. Completion badge and Play again

Answer choices:

- Dog / Cat / Both / Neither / Ask a grown-up

One progress paw is awarded per completed card, even if the player needed a retry.

## Editing content

### Food cards

Edit **`src/content/foods.json`** (loaded by `src/data/foods.ts`). Each card needs bilingual `zhHant` + `en` fields, an `image` path under `public/assets/`, a `correctAnswer`, and `reviewStatus`:

| `reviewStatus` | Meaning |
| --- | --- |
| `draft` | Not ready |
| `qa-checked` | Internal claim/QA pass — still not veterinary sign-off |
| `reviewed` | Qualified professional sign-off (required for `npm run build:release`) |

Do not invent nutritional claims or feeding quantities. Explain inspection habits only.

### Session settings

Tune exhibition behaviour in `src/config/settings.ts`:

- `sessionCardCount` — cards per play (default 6)
- `inactivityTimeoutSeconds` — idle time before warning
- `resetWarningSeconds` — countdown before auto-reset
- `soundEnabled` — master audio toggle (default `false` until MP3 cues exist)
- `allowAssetPreview` — `true` only in Vite dev builds

### Content gates

```bash
npm run check-content                                   # structural check
REQUIRE_REVIEWED_CONTENT=1 npm run check-content        # fails until every card is "reviewed"
npm run build:release                                   # signed-off public release build
```

`build` / `build:gh-pages` always run the structural check. They allow `qa-checked` cards and show an on-screen banner until status is `reviewed`.

## Assets

```
public/assets/foods/
public/assets/branding/
public/assets/pets/
public/assets/audio/   # optional: correct.mp3, retry.mp3, complete.mp3, tap.mp3
```

Missing images fall back to a labelled placeholder. In **local dev**, open the adult panel → asset preview.

## Exhibition notes

- Touch, mouse and keyboard work; no drag-and-drop.
- Inactivity reset runs on every screen except welcome (including asset preview if opened in dev).
- Reset clears progress, clues and feedback, and stops audio.
- Audio never autoplays; a player gesture is required.

## Deploy to GitHub Pages

Public site: [https://furryredball.github.io/food-rescue-paws/](https://furryredball.github.io/food-rescue-paws/)

- Vite `base` `/food-rescue-paws/` for the GitHub project site
- Preferred Pages source: **GitHub Actions** via `.github/workflows/deploy-github-pages.yml`
- Fallback: force-push a tested `dist/` to the `gh-pages` branch (used when the OAuth token lacks `workflow` scope)

```bash
npm run build:gh-pages
npm run preview
```

## Safety

This game teaches careful looking. It is not veterinary advice, a feeding calculator, or a balanced-meal planner. Always ask a grown-up before offering food to a pet. Cards currently ship as `qa-checked` pending qualified professional review.
