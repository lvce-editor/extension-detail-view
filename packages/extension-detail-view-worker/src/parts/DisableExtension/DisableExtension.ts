import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const disableExtension = (id: string): Promise<void> => {
  return RendererWorker.disableExtension(id)
}
