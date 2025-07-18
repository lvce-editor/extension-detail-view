import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: ExtensionDetailState): SavedState => {
  const { selectedTab, selectedFeature, readmeScrollTop, changelogScrollTop } = state
  return {
    selectedTab,
    selectedFeature,
    readmeScrollTop,
    changelogScrollTop,
  }
}
