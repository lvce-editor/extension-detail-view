import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const sendMessagePortToMarkdownWorker = async (port: any): Promise<void> => {
  await RendererWorker.sendMessagePortToMarkdownWorker(port, 0)
}
