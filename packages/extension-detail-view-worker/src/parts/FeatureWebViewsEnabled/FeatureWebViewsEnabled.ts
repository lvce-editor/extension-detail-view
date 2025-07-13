export const featureWebViewsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('webViews' in extension)) {
    return false
  }
  const webViews = extension.webViews
  return Array.isArray(webViews) && webViews.length > 0
}
