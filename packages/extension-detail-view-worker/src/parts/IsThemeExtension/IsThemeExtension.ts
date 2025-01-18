export const isThemeExtension = (extension: any): boolean => {
  return extension.name && extension.name.endsWith(' Theme')
}
