import { featureColorThemeEnabled } from '../FeatureColorThemeEnabled/FeatureColorThemeEnabled.ts'
import { featureIconThemeEnabled } from '../FeatureIconThemeEnabled/FeatureIconThemeEnabled.ts'
import { featureProductIconThemeEnabled } from '../FeatureProductIconThemeEnabled/FeatureProductIconThemeEnabled.ts'

export const featureThemeEnabled = (extension: unknown): boolean => {
  return featureColorThemeEnabled(extension) || featureIconThemeEnabled(extension) || featureProductIconThemeEnabled(extension)
}
