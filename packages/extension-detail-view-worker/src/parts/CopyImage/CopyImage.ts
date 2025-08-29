import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ClipBoard from '../Clipboard/Clipboard.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import * as GetImageCopyUrl from '../GetImageCopyUrl/GetImageCopyUrl.ts'

export const copyImage = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { iconSrc } = state
  const absoluteIconSrc = GetImageCopyUrl.getImageCopyUrl(iconSrc)
  const blob = await FileSystemWorker.readFileAsBlob(absoluteIconSrc)
  await ClipBoard.writeClipboardImage(blob)
  return state
}
