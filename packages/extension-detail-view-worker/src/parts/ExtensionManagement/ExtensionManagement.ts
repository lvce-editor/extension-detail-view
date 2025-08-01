import * as GetExtensionFallback from '../GetExtensionFallback/GetExtensionFallback.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const getExtensionNew = async (id: string): Promise<any> => {
  return RendererWorker.getExtension(id)
}

export const getExtension = async (id: string, platform: number): Promise<any> => {
  try {
    return await getExtensionNew(id)
  } catch {
    return GetExtensionFallback.getExtension(id, platform)
  }
}
