import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'

export interface UpdateFunction {
  (extensionId: string): Promise<any>
}

export const updateExtensionStatus = async (state: ExtensionDetailState, updateFunction: UpdateFunction): Promise<ExtensionDetailState> => {
  const { extensionId, platform, hasColorTheme } = state
  const error = await updateFunction(extensionId)
  if (error) {
    await RendererWorker.confirm(`${error}`)
  }
  const extension = await ExtensionManagement.getExtension(extensionId, platform)
  const disabled = extension?.disabled
  const buttons = getExtensionDetailButtons(hasColorTheme, false, disabled)
  return {
    ...state,
    disabled: extension?.disabled,
    buttons,
  }
}
