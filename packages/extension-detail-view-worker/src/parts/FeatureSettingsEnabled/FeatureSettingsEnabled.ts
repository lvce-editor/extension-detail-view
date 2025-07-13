export const featureSettingsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  return 'settings' in extension && Array.isArray(extension.settings)
}
