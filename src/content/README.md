# Edit text & images here

Open these files in Cursor and change the words directly.

## Text (Traditional Chinese + English)

| File | What it controls |
| --- | --- |
| `ui.json` | Buttons, instructions, stickers, feedback, adult panel |
| `foods.json` | Each food card: title, preparation, clues, explanation, image path |
| `sources.json` | Grown-up sources list |

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
2. If you use `.jpg` / `.png` / `.webp`, update the matching `image` path in `foods.json` (or pet paths in the welcome screen).

Example:

```json
"image": "foods/plain-cooked-chicken.jpg"
```

Then run `npm run dev` and refresh.
