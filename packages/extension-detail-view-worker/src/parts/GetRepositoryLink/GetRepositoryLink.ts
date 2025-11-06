import { hasProperty } from '../HasProperty/HasProperty.ts'

export const getRepositoryLink = (extension: unknown): string => {
  if (extension && hasProperty(extension, 'repository') && typeof extension.repository === 'string') {
    return extension.repository // TODO watch out for javascript: or other invalid links or path traversal
  }
  return ''
}
