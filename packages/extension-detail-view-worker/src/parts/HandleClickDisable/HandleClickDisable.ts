import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as DisableExtension from '../DisableExtension/DisableExtension.ts'

export const handleClickDisable = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extensionId } = state
  const error = await DisableExtension.disableExtension(extensionId)
  if (error) {
    await RendererWorker.confirm(`${error}`)
  }
  return state
}
