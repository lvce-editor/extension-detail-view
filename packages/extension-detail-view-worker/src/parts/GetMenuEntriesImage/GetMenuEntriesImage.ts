import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMenuEntriesImage = (state: ExtensionDetailState, props: ContextMenuProps): readonly MenuEntry[] => {
  return [
    {
      id: 'copyImage',
      label: ExtensionDetailStrings.copyImage(),
      flags: MenuItemFlags.None,
      command: 'ExtensionDetail.copyImage',
      args: [],
    },
    {
      id: 'copyImage',
      label: ExtensionDetailStrings.copyImageUrl(),
      flags: MenuItemFlags.None,
      command: 'ExtensionDetail.copyImageUrl',
      args: [],
    },
  ]
}
