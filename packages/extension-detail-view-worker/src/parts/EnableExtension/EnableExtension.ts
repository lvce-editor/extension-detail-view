import { RendererWorker } from '@lvce-editor/rpc-registry'

export const enableExtension = (id: string): Promise<any> => {
  return RendererWorker.enableExtension(id)
}
