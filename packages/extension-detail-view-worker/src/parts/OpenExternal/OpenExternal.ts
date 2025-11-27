import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openUrl = async (uri: string): Promise<void> => {
  await RendererWorker.openUrl(uri)
}
