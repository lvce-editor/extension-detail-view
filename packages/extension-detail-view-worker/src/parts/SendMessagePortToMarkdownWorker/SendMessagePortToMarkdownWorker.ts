import { RendererWorker } from '@lvce-editor/rpc-registry'

export const sendMessagePortToMarkdownWorker = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToMarkdownWorker(port, 0)
}
