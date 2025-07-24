import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { disableExtension } from '../DisableExtension/DisableExtension.ts'

export const handleClickDisable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extensionId } = state
  await disableExtension(extensionId)
  // TODO when it fails, show dialog / alert?
  return state
}
