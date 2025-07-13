export const featureColorThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('colorThemes' in extension)) {
    return false
  }
  return Array.isArray(extension.colorThemes)
}
