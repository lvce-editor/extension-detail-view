import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleClickSize = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { uri } = state.extension
  await RendererWorker.openNativeFolder(uri)
  return state
}
