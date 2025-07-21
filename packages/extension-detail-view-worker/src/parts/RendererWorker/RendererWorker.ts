import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  disableExtension,
  getAllExtensions,
  getExtension,
  getFolderSize,
  invoke,
  openExtensionSearch,
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
  openUrl,
} = RendererWorker
