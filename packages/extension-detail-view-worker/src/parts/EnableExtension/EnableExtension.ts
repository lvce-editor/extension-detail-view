import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const enableExtension = (id: string, platform: number): Promise<any> => {
  return ExtensionManagementWorker.invoke('Extensions.enable2', id, platform)
}
