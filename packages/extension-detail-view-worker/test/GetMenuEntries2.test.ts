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

test('returns image actions for the extension icon menu', () => {
  const state = createDefaultState()
  expect(
    getMenuEntries2(state, {
      menuId: MenuEntryId.ExtensionDetailIconContextMenu,
    }),
  ).toEqual([
    {
      args: [],
      command: 'ExtensionDetail.copyImage',
      flags: MenuItemFlags.None,
      id: 'copyImage',
      label: 'Copy Image',
    },
    {
      args: [],
      command: 'ExtensionDetail.copyImageUrl',
      flags: MenuItemFlags.None,
      id: 'copyImage',
      label: 'Copy Image Url',
    },
  ])
})

test('returns link and copy actions for a readme link', () => {
  const state = createDefaultState()
  expect(
    getMenuEntries2(state, {
      href: 'https://example.com',
      menuId: MenuEntryId.ExtensionDetailReadme,
      nodeName: 'A',
    }),
  ).toEqual([
    {
      args: ['https://example.com'],
      command: 'ExtensionDetail.copyReadmeLink',
      flags: MenuItemFlags.None,
      id: 'copyLink',
      label: 'Copy Link',
    },
    {
      args: [],
      command: 'ExtensionDetail.executeCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: 'Copy',
    },
  ])
})

test('returns only the copy action when a readme context menu has no link', () => {
  const state = createDefaultState()
  expect(
    getMenuEntries2(state, {
      href: '',
      menuId: MenuEntryId.ExtensionDetailReadme,
      nodeName: 'P',
    }),
  ).toEqual([
    {
      args: [],
      command: 'ExtensionDetail.executeCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: 'Copy',
    },
  ])
})
