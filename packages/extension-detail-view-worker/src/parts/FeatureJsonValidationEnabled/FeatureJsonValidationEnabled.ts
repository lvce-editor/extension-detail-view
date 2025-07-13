export const featureJsonValidationEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('jsonValidation' in extension)) {
    return false
  }
  return Array.isArray(extension.jsonValidation)
}
