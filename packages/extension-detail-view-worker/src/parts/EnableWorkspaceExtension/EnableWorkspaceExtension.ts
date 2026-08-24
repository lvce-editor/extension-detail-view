import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const enableWorkspaceExtension = (id: string): Promise<any> => {
  return ExtensionManagementWorker.invoke('Extensions.enableWorkspace', id)
}
