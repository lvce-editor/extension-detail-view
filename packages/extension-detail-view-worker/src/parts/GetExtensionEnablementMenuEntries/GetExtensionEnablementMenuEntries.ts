import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

export const getEnableMenuEntries = (): readonly MenuEntry[] => [
  {
    args: [],
    command: 'ExtensionDetail.handleClickEnable',
    flags: MenuItemFlags.None,
    id: 'enable',
    label: ExtensionDetailStrings.enable(),
  },
  {
    args: [],
    command: 'ExtensionDetail.handleClickEnableWorkspace',
    flags: MenuItemFlags.None,
    id: 'enableWorkspace',
    label: ExtensionDetailStrings.enableWorkspace(),
  },
]

export const getDisableMenuEntries = (): readonly MenuEntry[] => [
  {
    args: [],
    command: 'ExtensionDetail.handleClickDisable',
    flags: MenuItemFlags.None,
    id: 'disable',
    label: ExtensionDetailStrings.disable(),
  },
  {
    args: [],
    command: 'ExtensionDetail.handleClickDisableWorkspace',
    flags: MenuItemFlags.None,
    id: 'disableWorkspace',
    label: ExtensionDetailStrings.disableWorkspace(),
  },
]
