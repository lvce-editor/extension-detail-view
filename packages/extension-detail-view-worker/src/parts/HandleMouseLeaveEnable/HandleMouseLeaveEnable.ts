import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as PreviewColorTheme from '../PreviewColorTheme/PreviewColorTheme.ts'

export const handleMouseLeaveEnable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  try {
    await PreviewColorTheme.disablePreviewColorTheme()
  } catch (error) {
    console.warn(error)
  }
  return state
}
