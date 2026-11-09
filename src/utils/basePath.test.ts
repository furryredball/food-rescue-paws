import { describe, expect, it } from 'vitest'
import { normaliseBasePath, publicUrl } from './basePath'
import { assetUrl } from './assetUrl'
import { resolveBasePath } from './resolveBasePath'

describe('base path helpers', () => {
  it('normalises missing leading or trailing slashes', () => {
    expect(normaliseBasePath('food-rescue-paws')).toBe('/food-rescue-paws/')
    expect(normaliseBasePath('/food-rescue-paws')).toBe('/food-rescue-paws/')
    expect(normaliseBasePath('/food-rescue-paws/')).toBe('/food-rescue-paws/')
  })

  it('builds public and asset URLs from Vite BASE_URL', () => {
    // Vitest uses the Vite config base (default "/").
    expect(publicUrl('favicon.svg')).toBe('/favicon.svg')
    expect(assetUrl('foods/plain-cooked-chicken.svg')).toBe(
      '/assets/foods/plain-cooked-chicken.svg',
    )
  })
})

describe('resolveBasePath', () => {
  it('prefers BASE_PATH when set', () => {
    expect(
      resolveBasePath({
        BASE_PATH: 'food-rescue-paws',
        GITHUB_REPOSITORY: 'owner/other-repo',
      }),
    ).toBe('/food-rescue-paws/')
  })

  it('pins furryredball.github.io/food-rescue-paws/ under Actions', () => {
    expect(
      resolveBasePath({
        GITHUB_ACTIONS: 'true',
        GITHUB_REPOSITORY: 'furryredball/food-rescue-paws',
      }),
    ).toBe('/food-rescue-paws/')
  })

  it('falls back to root for local development', () => {
    expect(resolveBasePath({})).toBe('/')
  })
})
