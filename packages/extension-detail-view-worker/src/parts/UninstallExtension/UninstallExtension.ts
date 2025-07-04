import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const uninstallExtension = (id: string): Promise<void> => {
  // @ts-ignore todo
  return RendererWorker.invoke('ExtensionManagement.uninstall', id)
}
