import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const openExternalElectron = async (uri: string): Promise<void> => {
  await RendererWorker.openExternal(uri)
}

const openExternalWeb = async (uri: string): Promise<void> => {
  await RendererWorker.openUrl(uri)
}

export const openExternal = async (uri: string, platform: number): Promise<void> => {
  if (platform === PlatformType.Electron) {
    await openExternalElectron(uri)
  } else {
    await openExternalWeb(uri)
  }
}
