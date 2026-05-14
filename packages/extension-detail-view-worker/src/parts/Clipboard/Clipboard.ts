import { ClipBoardWorker } from '@lvce-editor/rpc-registry'

export const writeClipboardImage = async (blob: unknown): Promise<void> => {
  await ClipBoardWorker.writeImage(blob)
}

export const writeText = async (text: string): Promise<void> => {
  await ClipBoardWorker.writeText(text)
}
