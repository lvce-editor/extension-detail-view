import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getImageMenuEntries = (url: string): MenuEntry[] => [
  {
    id: 'openImageInNewTab',
    label: ViewletExtensionDetailStrings.openImageInNewTab(),
    flags: MenuItemFlags.None,
    command: 'Open.openUrl',
    args: [url],
  },
  {
    id: 'saveImageAs',
    label: ViewletExtensionDetailStrings.saveImageAs(),
    flags: MenuItemFlags.None,
    command: 'SaveFileAs.saveFileAs',
    args: ['image.png', url],
  },
]
