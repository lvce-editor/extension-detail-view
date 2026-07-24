import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as Clipboard from '../Clipboard/Clipboard.ts'

export const copyExtensionId = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  await Clipboard.writeText(state.extensionId)
  return state
}
