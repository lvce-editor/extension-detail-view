import type { Rpc } from '@lvce-editor/rpc'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'

let rpc: Rpc

export const set = (value: Rpc): void => {
  rpc = value
}

export const show2 = async (uid: number, menuId: number, x: number, y: number, args: ContextMenuProps): Promise<void> => {
  await rpc.invoke('Menu.show2', uid, menuId, x, y, args)
}
