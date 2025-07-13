export const featureProgrammingLanguagesEnabled = (extension: any): boolean => {
  return !!(extension && extension.programmingLanguages && extension.programmingLanguages.length > 0)
}