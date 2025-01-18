import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleTabsClick = (state: ExtensionDetailState, name: string): ExtensionDetailState => {
  // TODO load the tabs content if needed
  return {
    ...state,
    selectedTab: name,
  }
}
