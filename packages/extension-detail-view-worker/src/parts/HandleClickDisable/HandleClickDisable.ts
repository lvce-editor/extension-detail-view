import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as DisableExtension from '../DisableExtension/DisableExtension.ts'
import { updateExtensionStatus } from '../UpdateExtensionStatus/UpdateExtensionStatus.ts'

export const handleClickDisable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  return updateExtensionStatus(state, DisableExtension.disableExtension)
}
