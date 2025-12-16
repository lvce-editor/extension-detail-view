import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const disableExtension = (id: string, platform: number): Promise<any> => {
  return ExtensionManagementWorker.invoke('Extensions.disable2', id, platform)
}
