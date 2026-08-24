import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { disableWorkspaceExtension } from '../DisableWorkspaceExtension/DisableWorkspaceExtension.ts'
import { updateExtensionStatus } from '../UpdateExtensionStatus/UpdateExtensionStatus.ts'

export const handleClickDisableWorkspace = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  return updateExtensionStatus(state, disableWorkspaceExtension)
}
