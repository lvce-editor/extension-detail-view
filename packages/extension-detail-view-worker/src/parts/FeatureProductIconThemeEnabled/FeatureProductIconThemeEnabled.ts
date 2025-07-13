export const featureProductIconThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('productIconThemes' in extension)) {
    return false
  }
  return Array.isArray(extension.productIconThemes)
}
