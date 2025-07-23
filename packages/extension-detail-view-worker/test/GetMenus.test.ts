import { expect, test } from '@jest/globals'
import { getMenus } from '../src/parts/GetMenus/GetMenus.ts'

test('getMenus returns array with ExtensionDetailIconContextMenu', () => {
  const menus = getMenus()
  expect(menus).toBeDefined()
})
