export const featureProgrammingLanguagesEnabled = (extension: unknown): boolean => {
  if (!extension) {
    return false
  }
  return (
    typeof extension === 'object' &&
    'programmingLanguages' in extension &&
    Array.isArray(extension.programmingLanguages) &&
    extension.programmingLanguages.length > 0
  )
}
