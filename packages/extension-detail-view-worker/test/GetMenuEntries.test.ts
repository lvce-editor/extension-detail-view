import { expect, test } from '@jest/globals'
import * as GetMenuEntries from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'

test('handles isLink', () => {
  expect(GetMenuEntries.getMenuEntries({ isLink: true })).toEqual([
    {
      id: 'openInNewTab',
      label: ExtensionDetailStrings.openInNewTab(),
      flags: MenuItemFlags.None,
      command: 'Open.openUrl',
      args: [''],
    },
    {
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'ClipBoard.execCopy',
    },
  ])
})

test('handles isImage', () => {
  expect(GetMenuEntries.getMenuEntries({ isImage: true })).toEqual([
    {
      id: 'openImageInNewTab',
      label: ExtensionDetailStrings.openImageInNewTab(),
      flags: MenuItemFlags.None,
      command: 'Open.openUrl',
      args: [''],
    },
    {
      id: 'saveImageAs',
      label: ExtensionDetailStrings.saveImageAs(),
      flags: MenuItemFlags.None,
      command: 'SaveFileAs.saveFileAs',
      args: ['image.png', ''],
    },
    {
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'ClipBoard.execCopy',
    },
  ])
})

test('handles neither isLink nor isImage', () => {
  expect(GetMenuEntries.getMenuEntries({})).toEqual([
    {
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'ClipBoard.execCopy',
    },
  ])
})
