export const isLanguageBasicsExtension = (extension: any): boolean => {
  return extension.name && extension.name.startsWith('Language Basics')
}
