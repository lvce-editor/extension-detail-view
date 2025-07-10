import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const sendMessagePortToMarkdownWorker = async (port: any): Promise<void> => {
  // @ts-ignore
  await RendererWorker.sendMessagePortToEditorWorker(port, 0)
}
