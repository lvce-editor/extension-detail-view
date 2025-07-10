import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  disableExtension,
  getAllExtensions,
  getExtension,
  getFolderSize,
  getMarkdownDom,
  openNativeFolder,
  readFile,
  renderMarkdown,
  set,
  setColorTheme,
  uninstallExtension,
  sendMessagePortToMarkdownWorker,
} = RendererWorker
