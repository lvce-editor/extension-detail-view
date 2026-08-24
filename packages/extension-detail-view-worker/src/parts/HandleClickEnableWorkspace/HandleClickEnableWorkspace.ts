import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { enableWorkspaceExtension } from '../EnableWorkspaceExtension/EnableWorkspaceExtension.ts'
import { updateExtensionStatus } from '../UpdateExtensionStatus/UpdateExtensionStatus.ts'

export const handleClickEnableWorkspace = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  return updateExtensionStatus(state, enableWorkspaceExtension)
}
