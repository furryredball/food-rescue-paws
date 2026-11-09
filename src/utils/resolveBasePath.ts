import { normaliseBasePath } from './basePath'

/**
 * Resolve the public base path for GitHub Pages project sites.
 * Mirrors vite.base.ts so unit tests can cover the same rules without
 * importing the Vite config.
 */
export function resolveBasePath(env: {
  BASE_PATH?: string
  GITHUB_REPOSITORY?: string
}): string {
  const explicit = env.BASE_PATH?.trim()
  if (explicit) {
    return normaliseBasePath(explicit)
  }

  const repo = env.GITHUB_REPOSITORY?.trim()
  if (repo?.includes('/')) {
    const name = repo.split('/')[1]
    if (name) return normaliseBasePath(`/${name}/`)
  }

  return '/'
}
