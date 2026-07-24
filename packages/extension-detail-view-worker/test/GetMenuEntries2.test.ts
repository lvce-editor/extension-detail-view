import { expect, test } from '@jest/globals'
import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries2 } from '../src/parts/GetMenuEntries2/GetMenuEntries2.ts'

test('returns copy actions for the extension management menu', () => {
  const state = createDefaultState()
  expect(
    getMenuEntries2(state, {
      menuId: MenuEntryId.ManageExtension,
    }),
  ).toEqual([
    {
      args: [],
      command: 'ExtensionDetail.copyExtensionInfo',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: 'Copy',
    },
    {
      args: [],
      command: 'ExtensionDetail.copyExtensionId',
      flags: MenuItemFlags.None,
      id: 'copyExtensionId',
      label: 'Copy Extension ID',
    },
  ])
})
