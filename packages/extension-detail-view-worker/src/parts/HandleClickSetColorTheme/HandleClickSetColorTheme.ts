import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getColorThemeId } from '../GetColorThemeId/GetColorThemeId.ts'
import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const handleClickSetColorTheme = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension } = state
  const colorThemeId = getColorThemeId(extension)
  if (colorThemeId) {
    await SetColorTheme.setColorTheme(colorThemeId)
  }
  return state
}
