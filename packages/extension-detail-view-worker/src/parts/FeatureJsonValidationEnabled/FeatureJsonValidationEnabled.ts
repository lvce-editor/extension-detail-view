export const featureJsonValidationEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('jsonValidation' in extension)) {
    return false
  }
  const jsonValidation = extension.jsonValidation
  return Array.isArray(jsonValidation)
}
