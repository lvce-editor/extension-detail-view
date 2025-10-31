import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureSettingsEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'settings')) {
    return false
  }
  return Array.isArray(extension.settings)
}
