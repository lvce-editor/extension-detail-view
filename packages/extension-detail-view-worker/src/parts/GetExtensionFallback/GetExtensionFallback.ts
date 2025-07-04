import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const getAllExtensions = async (platform: number): Promise<readonly any[]> => {
  if (platform === PlatformType.Web) {
    return []
  }
  return RendererWorker.invoke('ExtensionManagement.getAllExtensions')
}

export const getExtension = async (id: string, platform: number): Promise<any> => {
  // TODO only ask one extension from renderer worker instead of all
  const allExtensions = await getAllExtensions(platform)
  for (const extension of allExtensions) {
    if (extension.id === id) {
      return extension
    }
  }
  return undefined
}
