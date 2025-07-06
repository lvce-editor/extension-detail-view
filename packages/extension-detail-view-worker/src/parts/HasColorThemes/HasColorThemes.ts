export const hasColorThemes = (extension: any): boolean => {
  return Boolean(extension && extension.colorThemes && extension.colorThemes.length > 0)
}
