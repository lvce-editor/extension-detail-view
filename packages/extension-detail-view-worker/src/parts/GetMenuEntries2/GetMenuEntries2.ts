import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getMenuEntriesImage } from '../GetMenuEntriesImage/GetMenuEntriesImage.ts'

export const getMenuEntries2 = (state: ExtensionDetailState, props: ContextMenuProps): readonly MenuEntry[] => {
  if (props.menuId === MenuEntryId.ExtensionDetailIconContextMenu) {
    return getMenuEntriesImage(state, props)
  }
  return [
    {
      args: [],
      command: 'ExtensionDetail.executeCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
    },
  ]
}
