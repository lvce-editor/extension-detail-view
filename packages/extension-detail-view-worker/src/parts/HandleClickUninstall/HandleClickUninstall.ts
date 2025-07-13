import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const handleClickUninstall = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { id } = state.extension
  await RendererWorker.uninstallExtension(id)
  return state
}
