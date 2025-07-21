import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const show = async (menuId: any, x: number, y: number): Promise<void> => {
  await RendererWorker.showContextMenu(x, y, menuId)
}
