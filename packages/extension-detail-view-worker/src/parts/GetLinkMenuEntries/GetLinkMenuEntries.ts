import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getLinkMenuEntries = (url: string): MenuEntry[] => [
  {
    id: 'openInNewTab',
    label: ViewletExtensionDetailStrings.openInNewTab(),
    flags: MenuItemFlags.None,
    command: 'Open.openUrl',
    args: [url],
  },
]
