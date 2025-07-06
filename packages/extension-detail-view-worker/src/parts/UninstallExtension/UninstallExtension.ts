import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const uninstallExtension = (id: string): Promise<void> => {
  return RendererWorker.uninstallExtension(id)
}
