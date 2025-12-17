import { ViewletCommand } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderFocus = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  return [ViewletCommand.FocusElementByName, '']
}
