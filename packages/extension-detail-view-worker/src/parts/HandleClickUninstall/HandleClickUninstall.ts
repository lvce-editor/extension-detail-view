import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { uninstallExtension } from '../UninstallExtension/UninstallExtension.ts'

export const handleClickUninstall = async (state: ExtensionDetailState): Promise<ExtensionDetailState> => {
  const { extension } = state
  const { id } = extension
  try {
    await uninstallExtension(id)
    return {
      ...state,
      buttons: [],
    }
  } catch (error) {
    await RendererWorker.showErrorDialog(error)
    return state
  }
}
