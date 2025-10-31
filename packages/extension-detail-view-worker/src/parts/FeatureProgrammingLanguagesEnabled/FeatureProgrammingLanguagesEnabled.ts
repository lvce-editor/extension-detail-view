import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureProgrammingLanguagesEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'languages')) {
    return false
  }
  const { languages } = extension
  return Array.isArray(languages)
}
