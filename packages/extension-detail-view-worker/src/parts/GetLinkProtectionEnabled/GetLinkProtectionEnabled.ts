import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getLinkProtectionEnabled = async (): Promise<boolean> => {
  const setting = await RendererWorker.getPreference('extensionDetail.linkProtectionEnabled')
  return setting === true || setting === 'true'
}
