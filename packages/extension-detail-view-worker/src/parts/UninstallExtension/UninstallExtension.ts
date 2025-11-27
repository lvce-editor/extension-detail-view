import { RendererWorker } from '@lvce-editor/rpc-registry'

export const uninstallExtension = (id: string): Promise<void> => {
  return RendererWorker.uninstallExtension(id)
}
