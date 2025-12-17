import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleTabFocus = (state: ExtensionDetailState, name: string): ExtensionDetailState => {
  const tabIndex = state.tabs.findIndex((tab) => tab.name === name)
  const newFocusedTabIndex = tabIndex >= 0 ? tabIndex : state.focusedTabIndex
  return {
    ...state,
    focusedTabIndex: newFocusedTabIndex,
  }
}
