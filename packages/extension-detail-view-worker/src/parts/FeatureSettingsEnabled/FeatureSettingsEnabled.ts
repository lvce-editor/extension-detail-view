export const featureSettingsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  // @ts-expect-error
  const settings = extension.settings
  return Array.isArray(settings) && settings.length > 0
}