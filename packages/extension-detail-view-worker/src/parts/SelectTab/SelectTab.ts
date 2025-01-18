import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const selectTab = (state: ExtensionDetailState, name: string): ExtensionDetailState => {
  return {
    ...state,
    selectedTab: name,
  }
}
