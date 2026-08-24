import { MenuEntryId } from '@lvce-editor/constants'
import type { Menu } from '../Menu/Menu.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getDisableMenuEntries, getEnableMenuEntries } from '../GetExtensionEnablementMenuEntries/GetExtensionEnablementMenuEntries.ts'
import { getMenuEntriesReadme } from '../GetMenuEntriesReadme/GetMenuEntriesReadme.ts'
import * as LocalMenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const ExtensionDetailIconContextMenu = 4091

export const getMenus = (): readonly Menu[] => {
  return [
    {
      entries: getMenuEntriesReadme(),
      id: MenuEntryId.ExtensionDetailReadme,
    },
    {
      entries: [
        {
          args: [],
          command: 'ExtensionDetail.openImageInNewTab',
          flags: MenuItemFlags.None,
          id: 'openImageInNewTab',
          label: ExtensionDetailStrings.openImageInNewTab(),
        },
        {
          args: [],
          command: 'ExtensionDetail.copyImage',
          flags: MenuItemFlags.None,
          id: 'copyImage',
          label: ExtensionDetailStrings.copyImage(),
        },
        {
          args: [],
          command: 'ExtensionDetail.copyImageUrl',
          flags: MenuItemFlags.None,
          id: 'copyImageUrl',
          label: ExtensionDetailStrings.copyImageUrl(),
        },
      ],
      id: ExtensionDetailIconContextMenu,
    },
    {
      entries: getEnableMenuEntries(),
      id: LocalMenuEntryId.ExtensionDetailEnableContextMenu,
    },
    {
      entries: getDisableMenuEntries(),
      id: LocalMenuEntryId.ExtensionDetailDisableContextMenu,
    },
  ]
}
