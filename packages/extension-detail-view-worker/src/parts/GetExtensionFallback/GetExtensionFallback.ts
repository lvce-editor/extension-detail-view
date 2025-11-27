import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as PlatformType from '../PlatformType/PlatformType.ts'

const getAllExtensions = async (platform: number): Promise<readonly any[]> => {
  if (platform === PlatformType.Web) {
    return []
  }
  // @ts-ignore
  return RendererWorker.getAllExtensions()
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
