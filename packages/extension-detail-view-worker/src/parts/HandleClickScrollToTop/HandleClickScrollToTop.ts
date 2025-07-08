import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleClickScrollToTop = (state: ExtensionDetailState): ExtensionDetailState => {
  return {
    ...state,
    readmeScrollTop: 0,
  }
}