import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureCommandsEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'commands')) {
    return false
  }
  return Array.isArray(extension.commands)
}
