import { WhenExpression } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleTabFocus = (state: ExtensionDetailState, name: string): ExtensionDetailState => {
  const { focusedTabIndex, tabs } = state
  const tabIndex = tabs.findIndex((tab) => tab.name === name)
  const newFocusedTabIndex = tabIndex === -1 ? focusedTabIndex : tabIndex
  return {
    ...state,
    focus: WhenExpression.FocusExtensioNDetailTabs,
    focusedTabIndex: newFocusedTabIndex,
  }
}
