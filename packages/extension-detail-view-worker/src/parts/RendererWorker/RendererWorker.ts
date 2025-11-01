/* eslint-disable unicorn/prefer-export-from */
import type { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  disableExtension,
  enableExtension,
  getAllExtensions,
  getExtension,
  getFolderSize,
  invoke,
  openExtensionSearch,
  openNativeFolder,
  openUrl,
  readFile,
  sendMessagePortToExtensionHostWorker,
  sendMessagePortToFileSystemWorker,
  sendMessagePortToMarkdownWorker,
  set,
  setColorTheme,
  setExtensionsSearchValue,
  showContextMenu,
  uninstallExtension,
  writeClipBoardImage,
  writeClipBoardText,
  registerMockRpc,
} = RendererWorker

export type { MockRpc }
