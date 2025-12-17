import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const focusPreviousTab = (state: ExtensionDetailState): ExtensionDetailState => {
  const { focusedTabIndex } = state
  const newFocusedTabIndex = focusedTabIndex <= 0 ? 0 : focusedTabIndex - 1
  return {
    ...state,
    focusedTabIndex: newFocusedTabIndex,
  }
}
