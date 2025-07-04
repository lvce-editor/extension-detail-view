import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const disableExtension = (id: string): Promise<void> => {
  // @ts-ignore todo
  return RendererWorker.invoke('ExtensionManagement.disable', id)
}
