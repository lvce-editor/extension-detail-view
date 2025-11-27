import { RendererWorker } from '@lvce-editor/rpc-registry'

export const disableExtension = (id: string): Promise<any> => {
  return RendererWorker.disableExtension(id)
}
