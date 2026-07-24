import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const handleClickScrollToTop = (state: ExtensionDetailState): ExtensionDetailState => {
  const { changelogScrollTop, readmeScrollTop, selectedTab } = state
  if (selectedTab === InputName.Changelog) {
    if (changelogScrollTop === 0) {
      return state
    }
    return {
      ...state,
      changelogScrollTop: 0,
    }
  }
  if (readmeScrollTop === 0) {
    return state
  }
  return {
    ...state,
    readmeScrollTop: 0,
  }
}
