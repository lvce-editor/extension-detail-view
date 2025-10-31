import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureProgrammingLanguagesEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'programmingLanguages')) {
    return false
  }
  const { programmingLanguages } = extension
  return Array.isArray(programmingLanguages)
}
