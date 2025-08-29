import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const enableExtension = (id: string): Promise<void> => {
  return RendererWorker.enableExtension(id)
}
