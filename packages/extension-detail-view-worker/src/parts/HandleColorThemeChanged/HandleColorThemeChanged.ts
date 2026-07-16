import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getColorThemeId, getColorThemeLabel } from '../GetColorThemeId/GetColorThemeId.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'

export const handleColorThemeChanged = (state: ExtensionDetailState, colorThemeId: string): ExtensionDetailState => {
  if (state.currentColorThemeId === colorThemeId) {
    return state
  }
  const { disabled, extension, hasColorTheme } = state
  const extensionColorThemeId = getColorThemeId(extension) || ''
  const extensionColorThemeLabel = getColorThemeLabel(extension) || ''
  const isBuiltin = extension?.isBuiltin || extension?.builtin || false
  const buttons = getExtensionDetailButtons(hasColorTheme, isBuiltin, disabled, extensionColorThemeId, extensionColorThemeLabel, colorThemeId)
  return {
    ...state,
    buttons,
    currentColorThemeId: colorThemeId,
  }
}
