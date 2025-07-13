export const featureSettingsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('settings' in extension)) {
    return false
  }
  return Array.isArray(extension.settings)
}
