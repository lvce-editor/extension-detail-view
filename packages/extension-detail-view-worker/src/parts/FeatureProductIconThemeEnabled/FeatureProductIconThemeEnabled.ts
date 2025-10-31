import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureProductIconThemeEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'productIconThemes')) {
    return false
  }
  return Array.isArray(extension.productIconThemes)
}
