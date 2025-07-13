export const featureSettingsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('settings' in extension)) {
    return false
  }
  const settings = (extension as { settings?: unknown }).settings
  return Array.isArray(settings) && settings.length > 0
}