export const featureThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  return (
    typeof extension === 'object' &&
    (('colorThemes' in extension && Array.isArray(extension.colorThemes)) ||
      ('iconThemes' in extension && Array.isArray(extension.iconThemes)) ||
      ('productIconThemes' in extension && Array.isArray(extension.productIconThemes)))
  )
}
