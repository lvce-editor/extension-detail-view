export const featureThemeEnabled = (extension: any): boolean => {
  return !!(extension && (
    (extension.colorThemes && extension.colorThemes.length > 0) ||
    (extension.iconThemes && extension.iconThemes.length > 0) ||
    (extension.productIconThemes && extension.productIconThemes.length > 0)
  ))
}