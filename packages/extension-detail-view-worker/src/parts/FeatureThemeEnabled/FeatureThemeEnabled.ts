export const featureColorThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('colorThemes' in extension)) {
    return false
  }
  const colorThemes = extension.colorThemes
  return Array.isArray(colorThemes)
}

export const featureIconThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('iconThemes' in extension)) {
    return false
  }
  const iconThemes = extension.iconThemes
  return Array.isArray(iconThemes)
}

export const featureProductIconThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('productIconThemes' in extension)) {
    return false
  }
  const productIconThemes = extension.productIconThemes
  return Array.isArray(productIconThemes)
}

export const featureThemeEnabled = (extension: unknown): boolean => {
  return featureColorThemeEnabled(extension) || featureIconThemeEnabled(extension) || featureProductIconThemeEnabled(extension)
}
