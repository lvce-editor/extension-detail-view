import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { enableExtension } from '../EnableExtension/EnableExtension.ts'
import { updateExtensionStatus } from '../UpdateExtensionStatus/UpdateExtensionStatus.ts'

export const handleClickEnable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  console.log('enable')
  return updateExtensionStatus(state, enableExtension)
}
