import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getApplicationName = async (): Promise<string> => {
  return RendererWorker.invoke('Layout.getApplicationName')
}
