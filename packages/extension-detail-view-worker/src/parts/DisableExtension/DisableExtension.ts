import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const disableExtension = (id: string, platform: number): Promise<any> => {
  return ExtensionManagementWorker.disable2(id, platform)
}
