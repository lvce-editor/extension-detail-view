import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getCopyMenuEntry = (): MenuEntry => ({
  id: 'copy',
  label: ViewletExtensionDetailStrings.copy(),
  flags: MenuItemFlags.None,
  command: 'ClipBoard.execCopy',
})
