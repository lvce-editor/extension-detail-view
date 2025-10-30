import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const disableExtension = (id: string): Promise<any> => {
  return RendererWorker.disableExtension(id)
}
