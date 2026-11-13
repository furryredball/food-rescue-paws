#!/usr/bin/env node
/**
 * Content gate for CI / signed-off releases.
 * Usage:
 *   node scripts/check-content.mjs
 *   REQUIRE_REVIEWED_CONTENT=1 node scripts/check-content.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const foods = JSON.parse(
  readFileSync(join(root, 'src/content/foods.json'), 'utf8'),
).foods

const ANSWER_VALUES = new Set([
  'dog',
  'cat',
  'both',
  'neither',
])
const requireReviewed = process.env.REQUIRE_REVIEWED_CONTENT === '1'
const errors = []
const seen = new Set()
const statusCounts = { draft: 0, 'qa-checked': 0, reviewed: 0 }

for (const card of foods) {
  if (!card.id?.trim()) {
    errors.push('A food card is missing an id.')
    continue
  }
  if (seen.has(card.id)) errors.push(`Duplicate food card id: "${card.id}".`)
  seen.add(card.id)

  if (!ANSWER_VALUES.has(card.correctAnswer)) {
    errors.push(`Card "${card.id}" has invalid correctAnswer.`)
  }
  if (requireReviewed && card.reviewStatus !== 'reviewed') {
    errors.push(
      `Card "${card.id}" is "${card.reviewStatus}" — set reviewStatus to "reviewed" after qualified sign-off, or omit REQUIRE_REVIEWED_CONTENT.`,
    )
  }
  if (card.reviewStatus in statusCounts) {
    statusCounts[card.reviewStatus] += 1
  }
  for (const field of ['title', 'preparation', 'explanation', 'imageAlt']) {
    const value = card[field]
    if (!value?.zhHant || !value?.en) {
      errors.push(`Card "${card.id}" needs bilingual ${field}.`)
    }
  }
}

if (errors.length) {
  console.error('Content check failed:\n' + errors.map((e) => ` - ${e}`).join('\n'))
  process.exit(1)
}

console.log(
  `Content check OK (${foods.length} cards` +
    (requireReviewed
      ? ', requireReviewed)'
      : `; statuses draft=${statusCounts.draft}, qa-checked=${statusCounts['qa-checked']}, reviewed=${statusCounts.reviewed})`),
)
