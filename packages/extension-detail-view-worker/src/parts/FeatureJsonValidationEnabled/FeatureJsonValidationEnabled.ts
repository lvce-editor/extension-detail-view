import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureJsonValidationEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'jsonValidation')) {
    return false
  }
  return Array.isArray(extension.jsonValidation)
}
