import { RendererWorker } from '@lvce-editor/rpc-registry'

export const openExtensionSearch = async (searchValue: string): Promise<void> => {
  await RendererWorker.openExtensionSearch()
  await RendererWorker.setExtensionsSearchValue(searchValue)
}
