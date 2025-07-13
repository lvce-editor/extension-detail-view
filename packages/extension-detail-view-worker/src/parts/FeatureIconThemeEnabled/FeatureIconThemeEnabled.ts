export const featureIconThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('iconThemes' in extension)) {
    return false
  }
  return Array.isArray(extension.iconThemes)
}
