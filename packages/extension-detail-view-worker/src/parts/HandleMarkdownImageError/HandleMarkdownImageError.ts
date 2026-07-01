import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ReplaceMarkdownImageWithError from '../ReplaceMarkdownImageWithError/ReplaceMarkdownImageWithError.ts'

export const handleMarkdownImageError = (state: ExtensionDetailState, failedSrc: string): ExtensionDetailState => {
  const detailsVirtualDom = ReplaceMarkdownImageWithError.replaceMarkdownImageWithError(state.detailsVirtualDom, failedSrc)
  const changelogVirtualDom = ReplaceMarkdownImageWithError.replaceMarkdownImageWithError(state.changelogVirtualDom, failedSrc)
  if (detailsVirtualDom === state.detailsVirtualDom && changelogVirtualDom === state.changelogVirtualDom) {
    return state
  }
  return {
    ...state,
    changelogVirtualDom,
    detailsVirtualDom,
  }
}
