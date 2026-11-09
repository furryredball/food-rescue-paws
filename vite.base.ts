/** Build-time base path helpers for Vite / GitHub Pages. */

export function normaliseBasePath(value: string): string {
  const trimmed = value.trim() || '/'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

/** Canonical GitHub Pages project path for this game. */
export const GITHUB_PAGES_BASE = '/food-rescue-paws/'

/**
 * Resolve the public base path for GitHub Pages project sites.
 * Assets must load from /food-rescue-paws/… rather than the domain root.
 *
 * Priority:
 * 1. BASE_PATH env
 * 2. GITHUB_ACTIONS / GITHUB_REPOSITORY → /food-rescue-paws/ (pinned site path)
 * 3. "/" for local development
 */
export function resolveBasePath(
  env: NodeJS.ProcessEnv = process.env,
): string {
  const explicit = env.BASE_PATH?.trim()
  if (explicit) {
    return normaliseBasePath(explicit)
  }

  // On GitHub Actions (or when the repo name matches), use the public site path.
  if (env.GITHUB_ACTIONS === 'true' || env.GITHUB_REPOSITORY) {
    const repoName = env.GITHUB_REPOSITORY?.split('/')[1]
    if (!repoName || repoName === 'food-rescue-paws') {
      return GITHUB_PAGES_BASE
    }
    return normaliseBasePath(`/${repoName}/`)
  }

  return '/'
}
