export const featureProgrammingLanguagesEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('programmingLanguages' in extension)) {
    return false
  }
  const programmingLanguages = (extension as { programmingLanguages?: unknown }).programmingLanguages
  return Boolean(Array.isArray(programmingLanguages) && programmingLanguages.length > 0)
}