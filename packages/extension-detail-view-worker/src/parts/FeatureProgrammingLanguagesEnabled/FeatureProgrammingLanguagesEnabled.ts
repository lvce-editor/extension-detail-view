export const featureProgrammingLanguagesEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object' || !('programmingLanguages' in extension)) {
    return false
  }
  const {programmingLanguages} = extension
  return Array.isArray(programmingLanguages)
}
