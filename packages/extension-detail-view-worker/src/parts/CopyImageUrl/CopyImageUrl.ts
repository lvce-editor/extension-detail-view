import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ClipBoard from '../Clipboard/Clipboard.ts'
import { getImageCopyUrl } from '../GetImageCopyUrl/GetImageCopyUrl.ts'

export const copyImageUrl = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { iconSrc } = state
  const absoluteIconSrc = getImageCopyUrl(iconSrc)
  await ClipBoard.writeText(absoluteIconSrc)
  return state
}
