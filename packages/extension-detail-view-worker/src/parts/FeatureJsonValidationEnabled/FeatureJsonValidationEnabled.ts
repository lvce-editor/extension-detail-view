export const featureJsonValidationEnabled = (extension: any): boolean => {
  return !!(extension && extension.jsonValidation && extension.jsonValidation.length > 0)
}