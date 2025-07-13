export const featureThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  let hasColorThemes = false
  let hasIconThemes = false
  let hasProductIconThemes = false
  if ('colorThemes' in extension) {
    const colorThemes = (extension as { colorThemes?: unknown }).colorThemes
    hasColorThemes = Array.isArray(colorThemes) && colorThemes.length > 0
  }
  if ('iconThemes' in extension) {
    const iconThemes = (extension as { iconThemes?: unknown }).iconThemes
    hasIconThemes = Array.isArray(iconThemes) && iconThemes.length > 0
  }
  if ('productIconThemes' in extension) {
    const productIconThemes = (extension as { productIconThemes?: unknown }).productIconThemes
    hasProductIconThemes = Array.isArray(productIconThemes) && productIconThemes.length > 0
  }
  return hasColorThemes || hasIconThemes || hasProductIconThemes
}