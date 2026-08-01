import { RendererWorker } from '@lvce-editor/rpc-registry'

export const sendMessagePortToExtensionHostWorker = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionManagementWorker(port, 0)
}
