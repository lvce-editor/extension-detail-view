import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const disableWorkspaceExtension = (id: string): Promise<any> => {
  return ExtensionManagementWorker.disableWorkspace(id)
}
