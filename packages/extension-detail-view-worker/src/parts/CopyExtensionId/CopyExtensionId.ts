import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as Clipboard from '../Clipboard/Clipboard.ts'

export const copyExtensionId = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extensionId } = state
  await Clipboard.writeText(extensionId)
  return state
}
