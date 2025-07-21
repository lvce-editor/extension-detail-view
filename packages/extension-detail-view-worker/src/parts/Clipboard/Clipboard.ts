import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const writeClipboardImage = async (blob: unknown): Promise<void> => {
  await RendererWorker.writeClipBoardImage(blob)
}
