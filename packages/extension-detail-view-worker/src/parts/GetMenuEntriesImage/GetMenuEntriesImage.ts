import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getMenuEntriesImage = (state: ExtensionDetailState, props: ContextMenuProps): readonly MenuEntry[] => {
  return [
    {
      args: [],
      command: 'ExtensionDetail.copyImage',
      flags: MenuItemFlags.None,
      id: 'copyImage',
      label: ExtensionDetailStrings.copyImage(),
    },
    {
      args: [],
      command: 'ExtensionDetail.copyImageUrl',
      flags: MenuItemFlags.None,
      id: 'copyImage',
      label: ExtensionDetailStrings.copyImageUrl(),
    },
  ]
}
