# Edit text & images here

Open these files in Cursor and change the words directly.

## Text (Traditional Chinese + English)

| File | What it controls |
| --- | --- |
| `ui.json` | Buttons, instructions, stickers, feedback, adult panel |
| `foods.json` | Each food card: title, preparation, clues, explanation, image path, reviewStatus |

Every text field looks like:

```json
"title": {
  "zhHant": "清煮雞肉",
  "en": "Plain cooked chicken"
}
```

Change `zhHant` and/or `en`. Keep the quotes and commas valid JSON.

Placeholders you may see: `{count}`, `{n}`, `{total}`, `{earned}`, `{paws}`, `{seconds}`, `{answer}`.

## Images

1. Drop files into `public/assets/foods/`, `public/assets/pets/`, or `public/assets/branding/`.
2. Match the food `image` path in `foods.json` (currently `.jpg` cartoon placeholders).

Current food filenames under `public/assets/foods/`:

- `plain-cooked-chicken.jpg`
- `raw-onion.jpg`
- `plain-cooked-carrot.jpg`
- `grape-cluster.jpg`
- `mystery-leftover-bowl.jpg`
- `plain-cooked-fish.jpg`
- `chocolate-brownie.jpg`
- `canned-tuna-unknown.jpg`
- `plain-tofu.jpg`
- `raw-salmon.jpg`
- `candy.jpg`
- `watermelon.jpg`
- `corn.jpg`
- `kiwi.jpg`
- `avocado.jpg`

Example:

```json
"image": "foods/plain-cooked-chicken.jpg"
```

Then run `npm run dev` and refresh.
