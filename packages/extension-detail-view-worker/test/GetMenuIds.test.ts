import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'
import * as LocalMenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('getMenuIds returns correct menu IDs', () => {
  const result = getMenuIds()
  expect(result).toEqual([
    MenuEntryId.ExtensionDetailReadme,
    MenuEntryId.ExtensionDetailIconContextMenu,
    MenuEntryId.ManageExtension,
    LocalMenuEntryId.ExtensionDetailChangelogContextMenu,
    LocalMenuEntryId.ExtensionDetailEnableContextMenu,
    LocalMenuEntryId.ExtensionDetailDisableContextMenu,
  ])
})
