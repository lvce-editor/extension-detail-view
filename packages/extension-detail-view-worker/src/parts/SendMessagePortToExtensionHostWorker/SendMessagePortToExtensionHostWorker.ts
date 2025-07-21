import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const sendMessagePortToExtensionHostWorker = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port, 0)
}
