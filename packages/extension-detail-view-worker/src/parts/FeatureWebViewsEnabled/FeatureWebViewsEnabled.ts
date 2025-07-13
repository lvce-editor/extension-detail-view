export const featureWebViewsEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  // @ts-expect-error
  const webViews = extension.webViews
  return Boolean(Array.isArray(webViews) && webViews.length > 0)
}