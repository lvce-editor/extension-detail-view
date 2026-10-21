import { expect, test } from '@jest/globals'
import { getFeatureDetailsSettings } from '../src/parts/GetFeatureDetailsSettings/GetFeatureDetailsSettings.ts'
import * as TableCellType from '../src/parts/TableCellType/TableCellType.ts'

test('returns no setting rows when settings are missing', () => {
  expect(getFeatureDetailsSettings({})).toEqual({
    settings: [],
  })
})

test('ignores malformed setting contributions', () => {
  expect(
    getFeatureDetailsSettings({ settings: [null, 'not a setting', {}, { id: 4 }, { default: false, description: 'Valid setting', id: 'valid' }] }),
  ).toEqual({
    settings: [
      [
        { type: TableCellType.Text, value: 'valid' },
        { type: TableCellType.Text, value: 'Valid setting' },
        { type: TableCellType.Text, value: 'false' },
      ],
    ],
  })
})
