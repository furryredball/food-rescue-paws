/** Normalise a Vite/GitHub Pages base path to always start and end with `/`. */
export function normaliseBasePath(value: string): string {
  const trimmed = value.trim() || '/'
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

/**
 * Join the configured public base with a path under `public/`.
 * Uses `import.meta.env.BASE_URL` so subdirectory deploys keep working.
 */
export function publicUrl(relativePath: string): string {
  const base = normaliseBasePath(import.meta.env.BASE_URL || '/')
  const path = relativePath.replace(/^\//, '')
  return `${base}${path}`
}
