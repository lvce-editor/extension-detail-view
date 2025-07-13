export const featureWebViewsEnabled = (extension: unknown): boolean => {
  if (!extension) {
    return false
  }
  return typeof extension === 'object' && 'webViews' in extension && Array.isArray(extension.webViews)
}
