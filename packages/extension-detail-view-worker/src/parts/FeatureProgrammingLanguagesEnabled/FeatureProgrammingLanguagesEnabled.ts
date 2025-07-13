export const featureProgrammingLanguagesEnabled = (extension: unknown): boolean => {
  if (!extension || typeof extension !== 'object') {
    return false
  }
  // @ts-expect-error
  const programmingLanguages = extension.programmingLanguages
  return Boolean(Array.isArray(programmingLanguages) && programmingLanguages.length > 0)
}