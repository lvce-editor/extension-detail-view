import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getImageCopyUrl } from '../GetImageCopyUrl/GetImageCopyUrl.ts'
import * as OpenUrl from '../OpenExternal/OpenExternal.ts'

export const openImageInNewTab = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { iconSrc } = state
  const absoluteIconSrc = getImageCopyUrl(iconSrc)
  await OpenUrl.openUrl(absoluteIconSrc)
  return state
}
