import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getColorThemeId } from '../GetColorThemeId/GetColorThemeId.ts'
import * as PreviewColorTheme from '../PreviewColorTheme/PreviewColorTheme.ts'

export const handleMouseEnterEnable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const colorThemeId = getColorThemeId(state.extension)
  if (!colorThemeId) {
    return state
  }
  try {
    await PreviewColorTheme.previewColorTheme(colorThemeId)
  } catch (error) {
    console.warn(error)
  }
  return state
}
