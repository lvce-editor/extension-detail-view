import { RendererWorker } from '@lvce-editor/rpc-registry'

export const { invoke, set, readFile, getAllExtensions, getFolderSize, openNativeFolder, uninstallExtension, getMarkdownDom, getExtension } =
  RendererWorker
