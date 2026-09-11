import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import * as MenuWorker from '../MenuWorker/MenuWorker.ts'

export const show2 = async <T extends ContextMenuProps>(
  uid: number,
  menuId: ContextMenuProps['menuId'],
  x: number,
  y: number,
  args: ContextMenuProps,
): Promise<void> => {
  await MenuWorker.show2(uid, menuId, x, y, args)
}
