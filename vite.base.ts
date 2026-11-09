/** Build-time base path helpers for Vite / GitHub Pages. */

export function normaliseBasePath(value: string): string {
  const trimmed = value.trim() || '/'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

/**
 * Resolve the public base path for GitHub Pages project sites.
 * Assets must load from /<repo>/… rather than the domain root.
 *
 * Priority:
 * 1. BASE_PATH env (e.g. /food-rescue-paws/)
 * 2. GITHUB_REPOSITORY when running in Actions (owner/repo → /repo/)
 * 3. "/" for local development
 */
export function resolveBasePath(
  env: NodeJS.ProcessEnv = process.env,
): string {
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
