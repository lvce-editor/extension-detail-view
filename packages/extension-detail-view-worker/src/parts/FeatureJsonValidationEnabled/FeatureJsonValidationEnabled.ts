export const featureJsonValidationEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('jsonValidation' in extension)) {
    return false
  }
  const jsonValidation = (extension as { jsonValidation?: unknown }).jsonValidation
  return Array.isArray(jsonValidation) && jsonValidation.length > 0
}