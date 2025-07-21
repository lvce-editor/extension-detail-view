import type { Menu } from '../Menu/Menu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const getMenus = (): readonly Menu[] => {
  return [
    {
      id: MenuEntryId.ExtensionDetailIconContextMenu,
      entries: [],
    },
  ]
}
