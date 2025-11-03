import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMenuEntries2 = (state: ExtensionDetailState, props: ContextMenuProps): readonly MenuEntry[] => {
  return [
    {
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'ExtensionDetail.executeCopy',
      args: [],
    },
  ]
}
