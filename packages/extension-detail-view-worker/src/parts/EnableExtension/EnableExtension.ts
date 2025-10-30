import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const enableExtension = (id: string): Promise<any> => {
  return RendererWorker.enableExtension(id)
}
