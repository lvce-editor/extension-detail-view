import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openExternal = async (uri: string, platform: number): Promise<void> => {
  if (platform === PlatformType.Electron) {
    // TODo call electron openexternal
  } else {
    await RendererWorker.openUrl(uri)
  }
}
