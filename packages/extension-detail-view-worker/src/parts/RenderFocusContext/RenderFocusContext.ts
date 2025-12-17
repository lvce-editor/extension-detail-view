import { ViewletCommand } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderFocusContext = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  // TODO set focus context
  return [ViewletCommand.FocusElementByName, '']
}
