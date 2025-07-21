import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const openUrl = async (uri: string): Promise<void> => {
  await RendererWorker.openUrl(uri)
}
