import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getCurrentColorTheme = async (): Promise<string> => {
  const setting = await RendererWorker.getPreference('workbnech.colorTheme')
  return setting || ''
}
