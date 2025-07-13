export const featureProductIconThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('productIconThemes' in extension)) {
    return false
  }
  const { productIconThemes } = extension
  return Array.isArray(productIconThemes)
}