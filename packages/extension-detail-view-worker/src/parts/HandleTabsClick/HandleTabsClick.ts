import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as SelectTab from '../SelectTab/SelectTab.ts'

export const handleTabsClick = (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  return SelectTab.selectTab(state, name)
}
