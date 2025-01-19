import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { SavedState } from '../SavedState/SavedState.ts'

export const saveState = (state: ExtensionDetailState): SavedState => {
  const { selectedTab, selectedFeature } = state
  return {
    selectedTab,
    selectedFeature,
  }
}
