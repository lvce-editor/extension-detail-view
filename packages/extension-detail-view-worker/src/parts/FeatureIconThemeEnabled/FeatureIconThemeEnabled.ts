import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureIconThemeEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'iconThemes')) {
    return false
  }
  return Array.isArray(extension.iconThemes)
}
