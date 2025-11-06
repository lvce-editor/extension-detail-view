import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ClipBoard from '../Clipboard/Clipboard.ts'

export const copyReadmeLink = async (state: ExtensionDetailState, href: string): Promise<ExtensionDetailState> => {
  await ClipBoard.writeText(href)
  return state
}
