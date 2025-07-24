import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { enableExtension } from '../EnableExtension/EnableExtension.ts'

export const handleClickEnable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extensionId } = state
  await enableExtension(extensionId)
  // TODO when it fails, show dialog / alert?
  return state
}
