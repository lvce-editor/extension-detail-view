import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const enableExtension = (id: string, platform: number): Promise<any> => {
  return ExtensionManagementWorker.enable2(id, platform)
}
