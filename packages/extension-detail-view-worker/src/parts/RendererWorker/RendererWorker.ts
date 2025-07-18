import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  disableExtension,
  getAllExtensions,
  getExtension,
  getFolderSize,
  invoke,
  openExtensionSearch,
  openNativeFolder,
  readFile,
  sendMessagePortToFileSystemWorker,
  sendMessagePortToMarkdownWorker,
  set,
  setColorTheme,
  setExtensionsSearchValue,
  uninstallExtension,
} = RendererWorker

// Temporary stub for clipboard image copy
export const copyImageToClipboard = async (blob: unknown): Promise<void> => {
  // TODO: implement actual call to renderer worker
  return
}
