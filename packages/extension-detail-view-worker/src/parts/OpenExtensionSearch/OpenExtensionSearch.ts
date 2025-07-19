import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const openExtensionSearch = async (searchValue: string): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('SideBar.openViewlet', 'Extensions')
  // @ts-ignore
  await RendererWorker.invoke('Extensions.handleInput', searchValue)
}
