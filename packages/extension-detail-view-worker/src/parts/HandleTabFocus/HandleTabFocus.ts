import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

const focusId = 451

export const handleTabFocus = (state: ExtensionDetailState, name: string): ExtensionDetailState => {
  const tabIndex = state.tabs.findIndex((tab) => tab.name === name)
  const newFocusedTabIndex = tabIndex === -1 ? state.focusedTabIndex : tabIndex
  return {
    ...state,
    focus: focusId,
    focusedTabIndex: newFocusedTabIndex,
  }
}
