import { normaliseBasePath } from './basePath'

export const GITHUB_PAGES_BASE = '/food-rescue-paws/'

/**
 * Resolve the public base path for GitHub Pages project sites.
 * Mirrors vite.base.ts so unit tests can cover the same rules without
 * importing the Vite config.
 */
export function resolveBasePath(env: {
  BASE_PATH?: string
  GITHUB_ACTIONS?: string
  GITHUB_REPOSITORY?: string
}): string {
  const explicit = env.BASE_PATH?.trim()
  if (explicit) {
    return normaliseBasePath(explicit)
  }

  if (env.GITHUB_ACTIONS === 'true' || env.GITHUB_REPOSITORY) {
    const repoName = env.GITHUB_REPOSITORY?.split('/')[1]
    if (!repoName || repoName === 'food-rescue-paws') {
      return GITHUB_PAGES_BASE
    }
    return normaliseBasePath(`/${repoName}/`)
  }

  return '/'
}
