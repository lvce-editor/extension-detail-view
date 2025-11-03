import { MenuEntryId } from '@lvce-editor/constants'
import type { Menu } from '../Menu/Menu.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getMenuEntriesReadme } from '../GetMenuEntriesReadme/GetMenuEntriesReadme.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const ExtensionDetailIconContextMenu = 4091

export const getMenus = (): readonly Menu[] => {
  return [
    {
      id: MenuEntryId.ExtensionDetailReadme,
      entries: getMenuEntriesReadme(),
    },
    {
      id: ExtensionDetailIconContextMenu,
      entries: [
        {
          id: 'openImageInNewTab',
          label: ExtensionDetailStrings.openImageInNewTab(),
          flags: MenuItemFlags.None,
          command: 'ExtensionDetail.openImageInNewTab',
          args: [],
        },
        {
          id: 'copyImage',
          label: ExtensionDetailStrings.copyImage(),
          flags: MenuItemFlags.None,
          command: 'ExtensionDetail.copyImage',
          args: [],
        },
        {
          id: 'copyImageUrl',
          label: ExtensionDetailStrings.copyImageUrl(),
          flags: MenuItemFlags.None,
          command: 'ExtensionDetail.copyImageUrl',
          args: [],
        },
      ],
    },
  ]
}
