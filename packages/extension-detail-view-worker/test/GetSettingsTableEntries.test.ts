import { expect, test } from '@jest/globals'
import { getFeatureDetailsSettings } from '../src/parts/GetFeatureDetailsSettings/GetFeatureDetailsSettings.ts'
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
  const { settings } = getFeatureDetailsSettings(extension)
  expect(GetSettingsTableEntries.getSettingsTableEntries(settings || [])).toEqual({
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
