import { DialogWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getColorThemeId, getColorThemeLabel } from '../GetColorThemeId/GetColorThemeId.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as SetColorTheme from '../SetColorTheme/SetColorTheme.ts'

export const handleClickSetColorTheme = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { disabled, extension, hasColorTheme } = state
  const colorThemeId = getColorThemeId(extension)
  if (colorThemeId) {
    const error = await SetColorTheme.setColorTheme(colorThemeId)
    if (error) {
      await DialogWorker.invoke('ConfirmPrompt.prompt', `${error}`)
    }
    const isBuiltin = extension?.isBuiltin || extension?.builtin || false
    const colorThemeLabel = getColorThemeLabel(extension) || ''
    const buttons = getExtensionDetailButtons(hasColorTheme, isBuiltin, disabled, colorThemeId, colorThemeLabel, colorThemeId)
    return {
      ...state,
      buttons,
      currentColorThemeId: colorThemeId,
    }
  }
  return state
}

export { getColorThemeId } from '../GetColorThemeId/GetColorThemeId.ts'
