import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getImageCopyUrl } from '../GetImageCopyUrl/GetImageCopyUrl.ts'
import * as OpenUrl from '../OpenExternal/OpenExternal.ts'

export const openImageInNewTab = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { iconSrc, locationHost, locationProtocol, platform } = state
  const absoluteIconSrc = getImageCopyUrl(iconSrc, locationProtocol, locationHost)
  await OpenUrl.openExternal(absoluteIconSrc, platform)
  return state
}
