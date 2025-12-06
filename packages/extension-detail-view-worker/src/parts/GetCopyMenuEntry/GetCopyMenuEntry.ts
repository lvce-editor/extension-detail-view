import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ViewletExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getCopyMenuEntry = (): MenuEntry => ({
  command: 'ClipBoard.execCopy',
  flags: MenuItemFlags.None,
  id: 'copy',
  label: ViewletExtensionDetailStrings.copy(),
})
