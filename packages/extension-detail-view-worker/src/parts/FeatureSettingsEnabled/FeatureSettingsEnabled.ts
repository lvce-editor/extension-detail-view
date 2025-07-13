export const featureSettingsEnabled = (extension: any): boolean => {
  return !!(extension && extension.settings && extension.settings.length > 0)
}