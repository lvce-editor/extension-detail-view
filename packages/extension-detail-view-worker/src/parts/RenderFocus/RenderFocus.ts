import { ViewletCommand } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderFocus = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { focus, focusedTabIndex, tabs, uid } = newState
  if (focus === 451) {
    const { name } = tabs[focusedTabIndex]
    return [ViewletCommand.FocusElementByName, uid, name]
  }
  return [ViewletCommand.FocusElementByName, '']
}
