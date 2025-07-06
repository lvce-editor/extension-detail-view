import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const getColorThemeId = (extension: any): string | undefined => {
  if (extension && Array.isArray(extension.colorThemes) && extension.colorThemes.length > 0) {
    const colorTheme = extension.colorThemes[0]
    return colorTheme.id || colorTheme.label
  }
  return undefined
}

export const handleClickSetColorTheme = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension } = state
  const colorThemeId = getColorThemeId(extension)
  if (colorThemeId) {
    await SetColorTheme.setColorTheme(colorThemeId)
  }
  return state
}
