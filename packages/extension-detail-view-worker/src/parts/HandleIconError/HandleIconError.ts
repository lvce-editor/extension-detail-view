import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as Icon from '../Icon/Icon.ts'

export const handleIconError = (state: ExtensionDetailState): ExtensionDetailState => {
  const { iconSrc, assetDir } = state
  if (iconSrc === Icon.extensionDefaultIcon(assetDir)) {
    return state
  }
  return {
    ...state,
    iconSrc: Icon.extensionDefaultIcon(assetDir),
  }
}
