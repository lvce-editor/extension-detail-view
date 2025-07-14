import type { SavedState } from '../SavedState/SavedState.ts'
import * as ExtensionDetailStates from '../ExtensionDetailStates/ExtensionDetailStates.ts'

export const saveState = (uid: number): SavedState => {
  const { newState } = ExtensionDetailStates.get(uid)
  const { selectedTab, selectedFeature, readmeScrollTop, changelogScrollTop } = newState
  return {
    selectedTab,
    selectedFeature,
    readmeScrollTop,
    changelogScrollTop,
  }
}
