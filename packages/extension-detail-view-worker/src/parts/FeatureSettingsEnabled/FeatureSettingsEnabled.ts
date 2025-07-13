export const featureSettingsEnabled = (extension: unknown): boolean => {
  if (!extension) {
    return false
  }
  return typeof extension === 'object' && 'settings' in extension && Array.isArray(extension.settings) && extension.settings.length > 0
}
