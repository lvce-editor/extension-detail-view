import { MenuItemFlags } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

const getMenuEntriesReadmeLink = (props: ContextMenuProps): readonly MenuEntry[] => {
  return [
    {
      id: 'copyLink',
      label: ExtensionDetailStrings.copyLink(),
      flags: MenuItemFlags.None,
      command: 'ExtensionDetail.copyLink',
      args: [],
    },
  ]
}

const getMenuEntriesReadme = (props: ContextMenuProps): readonly MenuEntry[] => {
  if (props.href) {
    return getMenuEntriesReadmeLink(props)
  }
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

// TODO maybe add props object as second property with properties like imagesrc, linksrc, nodeName

interface ContextMenuProps {
  readonly menuId: number
  readonly nodeName: string
  readonly href: string
}

export const getMenuEntries2 = (state: ExtensionDetailState, props: ContextMenuProps): readonly MenuEntry[] => {
  return getMenuEntriesReadme(props)
}
