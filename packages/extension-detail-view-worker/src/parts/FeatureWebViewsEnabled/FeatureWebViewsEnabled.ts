export const featureWebViewsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('webViews' in extension)) {
    return false
  }
  return Array.isArray(extension.webViews)
}
