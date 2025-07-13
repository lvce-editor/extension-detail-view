export const featureWebViewsEnabled = (extension: any): boolean => {
  return !!(extension && extension.webViews && extension.webViews.length > 0)
}