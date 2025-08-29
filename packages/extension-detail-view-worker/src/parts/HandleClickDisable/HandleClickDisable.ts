import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as DisableExtension from '../DisableExtension/DisableExtension.ts'

export const handleClickDisable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extensionId } = state
  await DisableExtension.disableExtension(extensionId)
  // TODO when it fails, show dialog / alert?
  return state
}
