import { RendererWorker } from '@lvce-editor/rpc-registry'

export const setColorTheme = (id: string): Promise<string> => {
  return RendererWorker.setColorTheme(id)
}
