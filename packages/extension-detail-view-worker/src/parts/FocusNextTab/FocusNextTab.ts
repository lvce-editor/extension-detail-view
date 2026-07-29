import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const focusNextTab = (state: ExtensionDetailState): ExtensionDetailState => {
  const { focusedTabIndex, tabs } = state
  const lastTabIndex = Math.max(0, tabs.length - 1)
  const newFocusedTabIndex = Math.min(focusedTabIndex + 1, lastTabIndex)
  return {
    ...state,
    focusedTabIndex: newFocusedTabIndex,
  }
}
