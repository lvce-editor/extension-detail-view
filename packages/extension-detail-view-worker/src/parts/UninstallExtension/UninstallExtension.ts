import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

export const uninstallExtension = async (id: string): Promise<void> => {
  await ExtensionManagementWorker.uninstall(id)
}
