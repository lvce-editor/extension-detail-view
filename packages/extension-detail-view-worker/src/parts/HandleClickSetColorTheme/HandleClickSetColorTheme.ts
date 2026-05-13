import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getColorThemeId, getColorThemeLabel } from '../GetColorThemeId/GetColorThemeId.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const handleClickSetColorTheme = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension } = state
  const colorThemeId = getColorThemeId(extension)
  if (colorThemeId) {
    const error = await SetColorTheme.setColorTheme(colorThemeId)
    if (error) {
      await RendererWorker.confirm(`${error}`)
    }
    const isBuiltin = extension?.isBuiltin || extension?.builtin || false
    const colorThemeLabel = getColorThemeLabel(extension) || ''
    const buttons = getExtensionDetailButtons(state.hasColorTheme, isBuiltin, state.disabled, colorThemeId, colorThemeLabel, colorThemeId)
    return {
      ...state,
      buttons,
      currentColorThemeId: colorThemeId,
    }
  }
  return state
}

export { getColorThemeId } from '../GetColorThemeId/GetColorThemeId.ts'
