import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const disableExtension = (id: string): Promise<any> => {
  return ExtensionManagementWorker.disable(id)
}
