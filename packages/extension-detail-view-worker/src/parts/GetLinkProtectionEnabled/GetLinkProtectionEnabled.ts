import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getLinkProtectionEnabled = async (): Promise<boolean> => {
<<<<<<< HEAD
  try {
    const setting = await RendererWorker.getPreference('extensionDetail.linkProtectionEnabled')
    return setting === true || setting === 'true'
  } catch {
    return false
  }
=======
  const setting = await RendererWorker.getPreference('application.linkProtectionEnabled')
  return setting === true || setting === 'true'
>>>>>>> origin/main
}
