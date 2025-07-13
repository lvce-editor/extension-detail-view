export const featureWebViewsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('webViews' in extension)) {
    return false
  }
  const webViews = extension.webViews
  return Array.isArray(webViews)
}
