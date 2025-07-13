export const featureJsonValidationEnabled = (extension: unknown): boolean => {
  if (!extension) {
    return false
  }
  return (
    typeof extension === 'object' && 'jsonValidation' in extension && Array.isArray(extension.jsonValidation) && extension.jsonValidation.length > 0
  )
}
