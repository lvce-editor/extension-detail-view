import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getContentsEnabled = async (): Promise<boolean> => {
  try {
    const setting = await RendererWorker.getPreference('extensionsShowContents')
    return setting === true || setting === 'true'
  } catch {
    return false
  }
}
