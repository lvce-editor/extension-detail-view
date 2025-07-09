import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderFocus = (oldState: ExtensionDetailState, newState: ExtensionDetailState): readonly any[] => {
  return ['Viewlet.focusElementByName', '']
}
