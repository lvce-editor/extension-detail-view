import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const show = async (menuId: any, x: number, y: number): Promise<void> => {
  await RendererWorker.showContextMenu(x, y, menuId)
}

export const show2 = async (uid: number, menuId: any, x: number, y: number, args: any): Promise<void> => {
  // @ts-ignore
  await RendererWorker.invoke('ContextMenu.show2', uid, menuId, x, y, args)
}
