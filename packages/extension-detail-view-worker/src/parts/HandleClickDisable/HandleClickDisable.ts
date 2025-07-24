import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { disableExtension } from '../DisableExtension/DisableExtension.ts'

export const handleClickDisable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  await disableExtension(state.extensionId)
  // TODO when it fails, show dialog / alert?
  return state
}
