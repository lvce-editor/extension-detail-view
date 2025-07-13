export const featureJsonValidationEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  // @ts-expect-error
  const jsonValidation = extension.jsonValidation
  return Boolean(Array.isArray(jsonValidation) && jsonValidation.length > 0)
}