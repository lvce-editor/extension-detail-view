import { MenuItemFlags } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMenuEntries2 = (state: ExtensionDetailState, menuId: number): readonly MenuEntry[] => {
  return [
    {
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'ExtensionDetail.copyReadmeText',
      args: [],
    },
  ]
}
