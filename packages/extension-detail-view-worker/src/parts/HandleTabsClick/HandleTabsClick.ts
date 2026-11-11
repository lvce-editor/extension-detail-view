import type { AsyncCommandContext } from '@lvce-editor/viewlet-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as SelectTab from '../SelectTab/SelectTab.ts'

export const handleTabsClick = (state: ExtensionDetailState, name: string): Promise<ExtensionDetailState> => {
  return SelectTab.selectTab(state, name)
}

export const handleTabsClickWithContext = (context: AsyncCommandContext<ExtensionDetailState>, name: string): Promise<void> => {
  return SelectTab.selectTabWithContext(context, name)
}
