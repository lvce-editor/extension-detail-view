export const featureProgrammingLanguagesEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  if (!('programmingLanguages' in extension)) {
    return false
  }
  const programmingLanguages = extension.programmingLanguages
  return Array.isArray(programmingLanguages)
}
