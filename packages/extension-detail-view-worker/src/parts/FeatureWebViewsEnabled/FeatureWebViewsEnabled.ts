import { hasProperty } from '../HasProperty/HasProperty.ts'

export const featureWebViewsEnabled = (extension: unknown): boolean => {
  if (!hasProperty(extension, 'webViews')) {
    return false
  }
  return Array.isArray(extension.webViews)
}
