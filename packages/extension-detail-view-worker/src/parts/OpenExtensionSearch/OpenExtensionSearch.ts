import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const openExtensionSearch = async (searchValue: string): Promise<void> => {
  await RendererWorker.openExtensionSearch()
  await RendererWorker.setExtensionsSearchValue(searchValue)
}
