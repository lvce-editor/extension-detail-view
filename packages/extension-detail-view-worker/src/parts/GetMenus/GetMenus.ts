import type { Menu } from '../Menu/Menu.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getMenus = (): readonly Menu[] => {
  return [
    {
      id: MenuEntryId.ExtensionDetailIconContextMenu,
      entries: [
        {
          id: 'copyImage',
          label: ExtensionDetailStrings.copyImage(),
          flags: MenuItemFlags.None,
          command: 'ExtensionDetail.copyImage',
          args: [],
        },
        {
          id: 'openImageInNewTab',
          label: ExtensionDetailStrings.openImageInNewTab(),
          flags: MenuItemFlags.None,
          command: 'ExtensionDetail.openImageInNewTab',
          args: [],
        },
      ],
    },
  ]
}
