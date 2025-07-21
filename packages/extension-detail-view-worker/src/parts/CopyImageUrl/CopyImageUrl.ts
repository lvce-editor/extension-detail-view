import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ClipBoard from '../Clipboard/Clipboard.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'
import { getImageCopyUrl } from '../GetImageCopyUrl/GetImageCopyUrl.ts'

export const copyImageUrl = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { iconSrc } = state
  const absoluteIconSrc = getImageCopyUrl(iconSrc)
  const blob = await FileSystemWorker.readFileAsBlob(absoluteIconSrc)
  await ClipBoard.writeClipboardImage(blob)
  return state
}
