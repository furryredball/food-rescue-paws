import { publicUrl } from './basePath'

/** Build a public asset URL that works under a GitHub Pages subdirectory. */
export function assetUrl(relativePath: string): string {
  const normalisedPath = relativePath.replace(/^\//, '')
  return publicUrl(`assets/${normalisedPath}`)
}
