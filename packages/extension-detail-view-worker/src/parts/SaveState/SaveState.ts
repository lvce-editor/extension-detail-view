import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: ExtensionDetailState): SavedState => {
  const { changelogScrollTop, readmeScrollTop, selectedFeature, selectedTab } = state
  return {
    changelogScrollTop,
    readmeScrollTop,
    selectedFeature,
    selectedTab,
  }
}
