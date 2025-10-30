export const getColorThemeId = (extension: any): string | undefined => {
  if (extension && Array.isArray(extension.colorThemes) && extension.colorThemes.length > 0) {
    const colorTheme = extension.colorThemes[0]
    return colorTheme.id || colorTheme.label
  }
  return undefined
}
