import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as InputName from '../InputName/InputName.ts'

export const selectTabSecurity = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { tabs: oldTabs } = state
  const tabs = oldTabs.map((tab) => {
    return {
      ...tab,
      selected: tab.name === InputName.Security,
    }
  })
  return {
    ...state,
    selectedTab: InputName.Security,
    tabs,
  }
}
