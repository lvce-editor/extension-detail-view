import { RendererWorker } from '@lvce-editor/rpc-registry'

export const show = async (menuId: any, x: number, y: number): Promise<void> => {
  await RendererWorker.showContextMenu(menuId, x, y)
}
