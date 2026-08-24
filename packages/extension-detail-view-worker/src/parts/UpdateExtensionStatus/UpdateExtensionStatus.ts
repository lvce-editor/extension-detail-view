import { DialogWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import { getColorThemeId, getColorThemeLabel } from '../GetColorThemeId/GetColorThemeId.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import { isBuiltinExtension } from '../IsBuiltinExtension/IsBuiltinExtension.ts'

export interface UpdateFunction {
  (extensionId: string, platform: number): Promise<any>
}

export const updateExtensionStatus = async (state: ExtensionDetailState, updateFunction: UpdateFunction): Promise<ExtensionDetailState> => {
  const { currentColorThemeId, extensionId, hasColorTheme, platform } = state
  const error = await updateFunction(extensionId, platform)
  if (error) {
    await DialogWorker.invoke('ConfirmPrompt.prompt', `${error}`)
  }
  const extension = await ExtensionManagement.getExtension(extensionId, platform)
  const disabled = extension?.disabled
  const extensionColorThemeId = getColorThemeId(extension) || ''
  const extensionColorThemeLabel = getColorThemeLabel(extension) || ''
  const isBuiltin = isBuiltinExtension(extension)
  const buttons = getExtensionDetailButtons(
    hasColorTheme,
    isBuiltin,
    disabled,
    extensionColorThemeId,
    extensionColorThemeLabel,
    currentColorThemeId,
    extension?.hasWorkspace === true,
  )
  return {
    ...state,
    buttons,
    disabled: extension?.disabled,
    extension,
  }
}
