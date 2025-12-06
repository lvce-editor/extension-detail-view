import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMenuEntriesReadme = (): readonly MenuEntry[] => [
  {
    args: [],
    command: 'ExtensionDetail.copyReadmeText',
    flags: MenuItemFlags.None,
    id: 'copy',
    label: ExtensionDetailStrings.copy(),
  },
]
