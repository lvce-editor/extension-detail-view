import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const focusNextTab = (state: ExtensionDetailState): ExtensionDetailState => {
  const { focusedTabIndex } = state
  const newFocusedTabIndex = focusedTabIndex >= 1 ? 1 : focusedTabIndex + 1
  return {
    ...state,
    focusedTabIndex: newFocusedTabIndex,
  }
}
