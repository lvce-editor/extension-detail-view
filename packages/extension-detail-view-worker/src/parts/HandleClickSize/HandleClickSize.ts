import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const handleClickSize = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { uri } = state.extension
  await RendererWorker.openNativeFolder(uri)
  return state
}
