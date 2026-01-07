import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getLinkProtectionEnabled = async (): Promise<boolean> => {
  try {
    const setting = await RendererWorker.getPreference('application.linkProtectionEnabled')
    return setting === true || setting === 'true'
  } catch {
    return false
  }
}
