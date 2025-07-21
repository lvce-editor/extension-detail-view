import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const openExternal = async (uri: string): Promise<void> => {
  await RendererWorker.openExternal(uri)
}
