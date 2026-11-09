/** Build a public asset URL that works under a GitHub Pages subdirectory. */
export function assetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL
  const normalisedBase = base.endsWith('/') ? base : `${base}/`
  const normalisedPath = relativePath.replace(/^\//, '')
  return `${normalisedBase}assets/${normalisedPath}`
}
