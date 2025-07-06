import { RendererWorker } from '@lvce-editor/rpc-registry'

export const {
  invoke,
  set,
  readFile,
  getAllExtensions,
  renderMarkdown,
  getFolderSize,
  openNativeFolder,
  uninstallExtension,
  getMarkdownDom,
  getExtension,
  setColorTheme,
} = RendererWorker
