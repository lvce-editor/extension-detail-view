import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as Clipboard from '../Clipboard/Clipboard.ts'
import { getExtensionInfoText } from '../GetExtensionInfoText/GetExtensionInfoText.ts'

export const copyExtensionInfo = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  await Clipboard.writeText(getExtensionInfoText(state))
  return state
}
