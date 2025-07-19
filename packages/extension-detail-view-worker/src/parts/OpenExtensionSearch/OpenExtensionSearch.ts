export const openExtensionSearch = async (searchValue: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('ExtensionSearch.open')
  // @ts-ignore
  await RendererWorker.invoke('ExtensionSearch.setSearchValue', searchString)
  // TODO open extension search view with this search string
  // TODO: Implement category click functionality
}
