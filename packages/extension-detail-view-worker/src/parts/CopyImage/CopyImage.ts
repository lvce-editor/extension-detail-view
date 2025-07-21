import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ClipBoard from '../Clipboard/Clipboard.ts'
import * as FileSystemWorker from '../FileSystemWorker/FileSystemWorker.ts'

export const copyImage = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { iconSrc } = state
  // TODO support gitpod url prefixes
  // @ts-ignore
  const prefix = `${location.protocol}//${location.host}`
  const absoluteIconSrc = `${prefix}${iconSrc}`
  const blob = await FileSystemWorker.readFileAsBlob(absoluteIconSrc)
  await ClipBoard.writeClipboardImage(blob)
  return state
}
