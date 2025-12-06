import { expect, test } from '@jest/globals'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetMenuEntries from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('handles isLink', () => {
  expect(GetMenuEntries.getMenuEntries({ isLink: true })).toEqual([
    {
      args: [''],
      command: 'Open.openUrl',
      flags: MenuItemFlags.None,
      id: 'openInNewTab',
      label: ExtensionDetailStrings.openInNewTab(),
    },
    {
      command: 'ClipBoard.execCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
    },
  ])
})

test('handles isImage', () => {
  expect(GetMenuEntries.getMenuEntries({ isImage: true })).toEqual([
    {
      args: [''],
      command: 'Open.openUrl',
      flags: MenuItemFlags.None,
      id: 'openImageInNewTab',
      label: ExtensionDetailStrings.openImageInNewTab(),
    },
    {
      args: ['image.png', ''],
      command: 'SaveFileAs.saveFileAs',
      flags: MenuItemFlags.None,
      id: 'saveImageAs',
      label: ExtensionDetailStrings.saveImageAs(),
    },
    {
      command: 'ClipBoard.execCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
    },
  ])
})

test('handles neither isLink nor isImage', () => {
  expect(GetMenuEntries.getMenuEntries({})).toEqual([
    {
      command: 'ClipBoard.execCopy',
      flags: MenuItemFlags.None,
      id: 'copy',
      label: ExtensionDetailStrings.copy(),
    },
  ])
})
