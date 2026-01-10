import { ViewletCommand, WhenExpression } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderFocusContext = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  const { focus, uid } = newState
  if (focus === WhenExpression.FocusExtensioNDetailTabs) {
    return [ViewletCommand.SetFocusContext, uid, focus]
  }
  // TODO set focus context
  return [ViewletCommand.FocusElementByName, '']
}
