import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { enableExtension } from '../EnableExtension/EnableExtension.ts'

export const handleClickEnable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extensionId } = state
  const error = await enableExtension(extensionId)
  if (error) {
    await RendererWorker.confirm(`${error}`)
  }
  return state
}
