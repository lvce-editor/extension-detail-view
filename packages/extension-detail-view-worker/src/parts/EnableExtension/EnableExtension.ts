import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const enableExtension = (id: string): Promise<any> => {
  return ExtensionManagementWorker.enable(id)
}
