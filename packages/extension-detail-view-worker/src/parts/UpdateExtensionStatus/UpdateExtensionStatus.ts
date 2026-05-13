import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import { getColorThemeId, getColorThemeLabel } from '../GetColorThemeId/GetColorThemeId.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'

export interface UpdateFunction {
  (extensionId: string, platform: number): Promise<any>
}

export const updateExtensionStatus = async (state: ExtensionDetailState, updateFunction: UpdateFunction): Promise<ExtensionDetailState> => {
  const { currentColorThemeId, extensionId, hasColorTheme, platform } = state
  const error = await updateFunction(extensionId, platform)
  if (error) {
    await RendererWorker.confirm(`${error}`)
  }
  const extension = await ExtensionManagement.getExtension(extensionId, platform)
  const disabled = extension?.disabled
  const extensionColorThemeId = getColorThemeId(extension) || ''
  const extensionColorThemeLabel = getColorThemeLabel(extension) || ''
  const isBuiltin = extension?.isBuiltin || extension?.builtin || false
  const buttons = getExtensionDetailButtons(hasColorTheme, isBuiltin, disabled, extensionColorThemeId, extensionColorThemeLabel, currentColorThemeId)
  return {
    ...state,
    buttons,
    disabled: extension?.disabled,
  }
}
