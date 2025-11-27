import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const handleClickUninstall = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { id } = state.extension
  await RendererWorker.uninstallExtension(id)
  return state
}
