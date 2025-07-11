import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleClickScrollToTop = (state: ExtensionDetailState): ExtensionDetailState => {
  const { readmeScrollTop } = state
  if (readmeScrollTop === 0) {
    return state
  }
  return {
    ...state,
    readmeScrollTop: 0,
  }
}
