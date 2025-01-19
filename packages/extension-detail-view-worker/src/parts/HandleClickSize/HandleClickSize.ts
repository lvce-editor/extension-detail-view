import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const handleClickSize = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const {uri} = state.extension
  await ParentRpc.invoke('OpenNativeFolder.openNativeFolder', uri)
  return state
}
