import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ReplaceMarkdownImageWithError from '../ReplaceMarkdownImageWithError/ReplaceMarkdownImageWithError.ts'

export const handleMarkdownImageError = (state: ExtensionDetailState, failedSrc: string): ExtensionDetailState => {
  const { changelogVirtualDom: oldChangelogVirtualDom, detailsVirtualDom: oldDetailsVirtualDom } = state
  const detailsVirtualDom = ReplaceMarkdownImageWithError.replaceMarkdownImageWithError(oldDetailsVirtualDom, failedSrc)
  const changelogVirtualDom = ReplaceMarkdownImageWithError.replaceMarkdownImageWithError(oldChangelogVirtualDom, failedSrc)
  if (detailsVirtualDom === oldDetailsVirtualDom && changelogVirtualDom === oldChangelogVirtualDom) {
    return state
  }
  return {
    ...state,
    changelogVirtualDom,
    detailsVirtualDom,
  }
}
