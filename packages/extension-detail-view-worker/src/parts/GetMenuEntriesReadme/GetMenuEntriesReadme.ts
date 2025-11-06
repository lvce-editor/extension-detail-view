import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMenuEntriesReadme = (): readonly MenuEntry[] => [
  {
    id: 'copy',
    label: ExtensionDetailStrings.copy(),
    flags: MenuItemFlags.None,
    command: 'ExtensionDetail.copyReadmeText',
    args: [],
  },
]
