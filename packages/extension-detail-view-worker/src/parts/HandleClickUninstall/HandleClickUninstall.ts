import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export const handleClickUninstall = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension } = state
  const { id } = extension
  await RendererWorker.uninstallExtension(id)
  return state
}
