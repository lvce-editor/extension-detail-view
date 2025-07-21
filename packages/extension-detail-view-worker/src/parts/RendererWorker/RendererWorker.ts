import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  disableExtension,
  getAllExtensions,
  getExtension,
  getFolderSize,
  invoke,
  openExtensionSearch,
  sendMessagePortToExtensionHostWorker,
  openNativeFolder,
  writeClipBoardText,
  readFile,
  sendMessagePortToFileSystemWorker,
  sendMessagePortToMarkdownWorker,
  set,
  setColorTheme,
  setExtensionsSearchValue,
  showContextMenu,
  uninstallExtension,
  writeClipBoardImage,
} = RendererWorker

export const openUrl = async (uri: string): Promise<void> => {
  // @ts-ignore
  await invoke('Open.openUrl', uri)
}
