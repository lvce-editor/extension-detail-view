import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabContents = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { contentsEnabled, tabs } = state
  if (!contentsEnabled) {
    return state
  }
  const updatedTabs = tabs.map((tab) => ({
    ...tab,
    selected: tab.name === InputName.Contents,
  }))
  return {
    ...state,
    selectedTab: InputName.Contents,
    tabs: updatedTabs,
  }
}
