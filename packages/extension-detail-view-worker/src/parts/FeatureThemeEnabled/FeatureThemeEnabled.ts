export const featureThemeEnabled = (extension: any): boolean => {
  return extension && (extension.colorThemes || extension.iconThemes || extension.productIconThemes)
}