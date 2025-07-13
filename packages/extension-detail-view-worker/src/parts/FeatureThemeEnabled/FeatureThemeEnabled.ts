export const featureThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  // @ts-expect-error
  const colorThemes = extension.colorThemes
  // @ts-expect-error
  const iconThemes = extension.iconThemes
  // @ts-expect-error
  const productIconThemes = extension.productIconThemes
  return (
    (Array.isArray(colorThemes) && colorThemes.length > 0) ||
    (Array.isArray(iconThemes) && iconThemes.length > 0) ||
    (Array.isArray(productIconThemes) && productIconThemes.length > 0)
  )
}