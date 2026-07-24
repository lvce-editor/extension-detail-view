import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds returns correct menu IDs', () => {
  const result = getMenuIds()
  expect(result).toEqual([MenuEntryId.ExtensionDetailReadme, MenuEntryId.ExtensionDetailIconContextMenu, MenuEntryId.ManageExtension])
})
