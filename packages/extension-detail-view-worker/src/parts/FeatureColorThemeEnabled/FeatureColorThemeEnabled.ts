import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureColorThemeEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'colorThemes')) {
    return false
  }
  return Array.isArray(extension.colorThemes)
}
