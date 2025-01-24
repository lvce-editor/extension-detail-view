import { expect, test } from '@jest/globals'
import * as GetSettingsTableEntries from '../src/parts/GetSettingsTableEntries/GetSettingsTableEntries.ts'

test('get settings table entries with settings', () => {
  const extension = {
    settings: [
      {
        id: 'editor.fontSize',
        type: 'number',
        default: 14,
        description: 'Controls the font size in pixels',
      },
      {
        id: 'editor.fontFamily',
        type: 'string',
        default: 'monospace',
        description: 'Controls the font family',
      },
    ],
  }
  expect(GetSettingsTableEntries.getSettingsTableEntries(extension)).toEqual({
    headings: ['ID', 'Label'],
    rows: [
      [
        { type: 1, value: 'editor.fontSize' },
        { type: 1, value: undefined },
      ],
      [
        { type: 1, value: 'editor.fontFamily' },
        { type: 1, value: undefined },
      ],
    ],
  })
})
