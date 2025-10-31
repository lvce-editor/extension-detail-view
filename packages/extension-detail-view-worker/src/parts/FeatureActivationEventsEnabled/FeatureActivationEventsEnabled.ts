import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureActivationEventsEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'activation')) {
    return false
  }
  return Array.isArray(extension.activation)
}
