import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openExternal = async (uri: string): Promise<void> => {
  // @ts-ignore
  await invoke('OpenExternal.openExternal', uri)
}

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
  showContextMenu,
  writeClipBoardImage,
} = RendererWorker
