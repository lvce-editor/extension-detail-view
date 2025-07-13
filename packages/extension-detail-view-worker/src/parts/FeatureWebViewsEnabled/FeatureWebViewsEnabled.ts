export const featureWebViewsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  return 'webViews' in extension && Array.isArray(extension.webViews)
}
