import { featureColorThemeEnabled } from '../FeatureColorThemeEnabled/FeatureColorThemeEnabled.ts'
import { featureIconThemeEnabled } from '../FeatureIconThemeEnabled/FeatureIconThemeEnabled.ts'

export const featureProductIconThemeEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('productIconThemes' in extension)) {
    return false
  }
  const {productIconThemes} = extension
  return Array.isArray(productIconThemes)
}

export const featureThemeEnabled = (extension: unknown): boolean => {
  return featureColorThemeEnabled(extension) || featureIconThemeEnabled(extension) || featureProductIconThemeEnabled(extension)
}
