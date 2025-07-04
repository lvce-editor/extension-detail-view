import { VError } from '@lvce-editor/verror'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const getFolderSize = async (uri: string): Promise<number> => {
  if (!uri) {
    throw new VError(`uri is required`)
  }
  try {
    // @ts-ignore todo
    return await RendererWorker.invoke('FileSystem.getFolderSize', uri)
  } catch {
    return 0
  }
}
