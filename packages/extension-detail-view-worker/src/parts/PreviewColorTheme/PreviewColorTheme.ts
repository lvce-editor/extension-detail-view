import { RendererWorker } from '@lvce-editor/rpc-registry'

export const previewColorTheme = async (colorThemeId: string): Promise<void> => {
  await RendererWorker.invoke('ColorTheme.previewColorTheme', colorThemeId)
}

export const disablePreviewColorTheme = async (): Promise<void> => {
  await RendererWorker.invoke('ColorTheme.disablePreviewColorTheme')
}
