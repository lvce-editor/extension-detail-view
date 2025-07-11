import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  disableExtension,
  getAllExtensions,
  getExtension,
  getFolderSize,
  openNativeFolder,
  readFile,
  set,
  setColorTheme,
  uninstallExtension,
  sendMessagePortToMarkdownWorker,
} = RendererWorker

// Temporary stub for clipboard image copy
export const copyImageToClipboard = async (blob: unknown): Promise<void> => {
  // TODO: implement actual call to renderer worker
  return
}
