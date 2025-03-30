import { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const renderFocus = async (oldState: ExtensionDetailState, newState: ExtensionDetailState): Promise<readonly any[]> => {
  return ['Viewlet.focusElementByName', '']
}
