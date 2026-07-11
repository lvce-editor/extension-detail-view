import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const handleClickScrollToTop = (state: ExtensionDetailState): ExtensionDetailState => {
  if (state.selectedTab === InputName.Changelog) {
    if (state.changelogScrollTop === 0) {
      return state
    }
    return {
      ...state,
      changelogScrollTop: 0,
    }
  }
  const { readmeScrollTop } = state
  if (readmeScrollTop === 0) {
    return state
  }
  return {
    ...state,
    readmeScrollTop: 0,
  }
}
