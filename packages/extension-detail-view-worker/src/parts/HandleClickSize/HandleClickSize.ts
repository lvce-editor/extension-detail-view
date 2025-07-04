import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const handleClickSize = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { uri } = state.extension
  await RendererWorker.invoke('OpenNativeFolder.openNativeFolder', uri)
  return state
}
